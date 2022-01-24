import axios from 'axios';
import mysql from 'mysql2/promise';
import redisClient from '../../config/createRedisClient.js';
import consoleLogger from '../../lib/consoleLogger.js';
import parseEventData from '../../lib/parseEventData.js';

// intra accessToken 발급
async function getFtAccessToken() {
  try {
    const exToken = await redisClient.get('ft_access_token');
    if (!exToken) {
      const res = await axios.post('https://api.intra.42.fr/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.FORTYTWO_APP_ID,
        client_secret: process.env.FORTYTWO_APP_SECRET,
      });
      const newToken = res.data.access_token;
      const result = await redisClient.setEx('ft_access_token', 7100, newToken);
      if (result.localeCompare('OK')) throw new Error(`failed to insert ft access token`);
      consoleLogger.info('get42AccessToken : issued new token');
      return newToken;
    }
    return exToken;
  } catch (err) {
    consoleLogger.error('getFtAccessToken : ', err.stack);
    return null;
  }
}

// intra에서 100개의 이벤트를 get
async function getIntraEvent() {
  try {
    const token = await getFtAccessToken();
    if (!token) throw new Error('token is not exist');
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/events?page[size]=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    consoleLogger.error('getIntraEvent: ', err.stack);
    return null;
  }
}

// intra에서 100개의 Exam을 get
async function getIntraExam() {
  try {
    // token 만료 방지를 위해 getFtAccessToken 한 번 더 호출.
    const token = await getFtAccessToken();
    if (!token) throw new Error('token is not exist');
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/exams?page[size]=100', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    consoleLogger.error('getIntraExam: ', err.stack);
    return null;
  }
}

async function insertEventList(eventList) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    const sql =
      'INSERT INTO event ' +
      '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
      'topic, details, createdAt, modifiedAt, intraId) ' +
      'VALUES ? ;';
    const [rows] = await connection.query(sql, [eventList]);
    consoleLogger.info('insertEventList : query success : ', rows);
  } catch (err) {
    consoleLogger.error('insertEventList : ', err.stack);
  } finally {
    connection.end();
  }
}

// event와 exam을 불러와서 db에 저장
async function initEventData() {
  try {
    const eventList = await getIntraEvent();
    const examList = await getIntraExam();
    if (!eventList && !eventList) throw new Error('Intra GET request failed');
    eventList.push(...examList);
    const parsedEvents = await parseEventData(eventList);
    insertEventList(parsedEvents);
  } catch (err) {
    consoleLogger.error('initEventData : ', err.stack);
  } finally {
    redisClient.quit();
  }
}
initEventData();
