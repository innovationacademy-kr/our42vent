import axios from 'axios';
import mysql from 'mysql2/promise';
import redisClient from '../../config/createRedisClient.js';
import getFtAccessToken from './getFtAccessToken.js';
import consoleLogger from '../../lib/consoleLogger.js';
import parseEventData from '../../lib/parseEventData.js';

// intra에서 100개의 이벤트를 get
async function getIntraEvent(pageNum) {
  try {
    const token = await getFtAccessToken(redisClient);
    if (!token) throw new Error('token does not exist');
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/cursus/21/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'page[size]': 100,
        'page[number]': pageNum,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// intra에서 100개의 Exam을 get
async function getIntraExam(pageNum) {
  try {
    // token 만료 방지를 위해 getFtAccessToken 한 번 더 호출.
    const token = await getFtAccessToken(redisClient);
    if (!token) throw new Error('token does not exist');
    const res = await axios.get('https://api.intra.42.fr/v2/campus/29/cursus/21/exams', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'page[size]': 100,
        'page[number]': pageNum,
      },
    });
    return res.data;
  } catch (err) {
    throw new Error(err.message);
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
      'topic, details, createdAt, modifiedAt, intraId) VALUES ?;';
    const [rows] = await connection.query(sql, [eventList]);
    consoleLogger.info('insertEventList : query success : ', rows);
  } finally {
    connection.end();
  }
}

// event와 exam을 불러와서 db에 저장
async function initEventData() {
  try {
    const eventList = await getIntraEvent(1);
    const secondEventList = await getIntraEvent(2);
    const examList = await getIntraExam(1);
    const secondExamList = await getIntraExam(2);
    const thirdExamList = await getIntraExam(3);

    examList.push(...secondExamList, ...thirdExamList);
    const examSet = new Set(examList.map(JSON.stringify));
    eventList.push(...secondEventList, ...[...examSet].map(JSON.parse));
    if (!eventList.length) {
      consoleLogger.info('initEventData : no event to initialize', new Date());
      return;
    }
    const parsedEvents = await parseEventData(eventList);
    await insertEventList(parsedEvents);
  } catch (err) {
    consoleLogger.error('initEventData : ', err.stack);
  } finally {
    redisClient.quit();
  }
}

initEventData();
