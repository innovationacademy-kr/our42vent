import axios from 'axios';
import mysql from 'mysql2/promise';
import { promisify } from 'util';
import redisClient from '../../config/createRedisClient.js';
import getFtAccessToken from './getFtAccessToken.js';
import consoleLogger from '../../lib/consoleLogger.js';
import parseEventData from '../../lib/parseEventData.js';

// 가장 최근의 intra event를 기준으로 그 이후 ~ 현재 시각 까지 업데이트된 event get
async function getUpdatedIntraEvent(latestDate, depth = 0) {
  if (depth > 3) throw new Error('too many recursion');
  try {
    const token = await getFtAccessToken(redisClient);
    if (!token) throw new Error('token does not exist');
    latestDate.setMilliseconds(999);
    const latestDateStr = JSON.stringify(latestDate);
    const curDateStr = JSON.stringify(new Date());
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/cursus/21/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'range[updated_at]': `${latestDateStr},${curDateStr}`,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response.statusText === 'Unauthorized') {
      redisClient.del('ft_access_token');
      await promisify(setTimeout)(1000); // 연속 요청 방지를 위한 1000
      consoleLogger.info('getUpdatedIntraEvent : Unauthorized Access : request again');
      const data = await getUpdatedIntraEvent(latestDate, depth + 1);
      return data;
    }
    throw new Error(err.message);
  }
}

// 가장 최근의 intra event를 기준으로 그 이후 ~ 현재 시각 까지 업데이트된 exam get
async function getUpdatedIntraExam(latestDate, depth = 0) {
  if (depth > 3) throw new Error('too many recursion');
  try {
    const token = await getFtAccessToken(redisClient);
    if (!token) throw new Error('token does not exist');
    latestDate.setMilliseconds(999);
    const latestDateStr = JSON.stringify(latestDate);
    const curDateStr = JSON.stringify(new Date());
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/cursus/21/exams', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'range[updated_at]': `${latestDateStr},${curDateStr}`,
        'page[size]': 100,
      },
    });
    return res.data;
  } catch (err) {
    if (err.response.statusText === 'Unauthorized') {
      redisClient.del('ft_access_token');
      await promisify(setTimeout)(1000);
      consoleLogger.info('getUpdatedIntraExam : Unauthorized Access : request again');
      const data = await getUpdatedIntraExam(latestDate, depth + 1);
      return data;
    }
    throw new Error(err.message);
  }
}

async function selectLatestEvent(connection) {
  const sql =
    'SELECT modifiedAt FROM event WHERE modifiedAt=(SELECT Max(modifiedAt) FROM event ' +
    'WHERE intraId IS NOT NULL AND category NOT IN ("exam"));';
  const [rows] = await connection.query(sql);
  consoleLogger.info('selectLatestEvent : query success : ', rows);
  return rows[0];
}

async function selectLatestExam(connection) {
  const sql =
    'SELECT modifiedAt FROM event WHERE modifiedAt=(SELECT Max(modifiedAt) FROM event ' +
    'WHERE intraId IS NOT NULL AND category="exam");';
  const [rows] = await connection.query(sql);
  consoleLogger.info('selectLatestExam : query success : ', rows);
  return rows[0];
}

async function insertUpdatedEventList(connection, eventList) {
  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details, createdAt, modifiedAt, intraId) VALUES ? ' +
    'ON DUPLICATE KEY UPDATE title = VALUES(title), personInCharge = VALUES(personIncharge), ' +
    'beginAt = VALUES(beginAt), endAt = VALUES(endAt), location = VALUES(location), category = VALUES(category), ' +
    'topic = VALUES(topic), details = VALUES(details), modifiedAt = VALUES(modifiedAt);';
  const [rows] = await connection.query(sql, [eventList]);
  consoleLogger.info('insertUpdatedEventList : query success : ', rows);
}

// event와 exam을 불러와서 db에 저장
async function updateEventData() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    const { modifiedAt: latestEventDate } = await selectLatestEvent(connection);
    const { modifiedAt: latestExamDate } = await selectLatestExam(connection);
    const eventList = await getUpdatedIntraEvent(latestEventDate);
    const examList = await getUpdatedIntraExam(latestExamDate);

    const examSet = new Set(examList.map(JSON.stringify));
    eventList.push(...[...examSet].map(JSON.parse));
    if (!eventList.length) {
      consoleLogger.info('updateEventData : no event to update');
      return;
    }
    const parsedEvents = await parseEventData(eventList);
    await insertUpdatedEventList(connection, parsedEvents);
    consoleLogger.info('updateEventData : events updated!');
  } catch (err) {
    consoleLogger.error('updateEventData : ', err.stack);
  } finally {
    redisClient.quit();
    connection.end();
  }
}

updateEventData();
