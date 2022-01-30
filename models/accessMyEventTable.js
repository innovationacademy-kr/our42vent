import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// my_event 테이블에 INSERT
export async function insertMyEvent(userId, eventId, notification) {
  consoleLogger.info(
    `insertMyEvent : try inserting eventId=${eventId}, notification=${notification} `
  );

  const sql = 'INSERT INTO my_event (eventId, userId, notification) VALUES (?, ?, ?);';

  const rows = await pool.execute(sql, [eventId, userId, notification]);
  consoleLogger.info('insertMyEvent : query success : ', rows);
}

// 내가 등록한 이벤트 SELECT
export async function selectMyEvents(userId, firstDate, lastDate) {
  const sql =
    'SELECT event.id, title, beginAt, endAt, category FROM event ' +
    'INNER JOIN my_event ON my_event.eventId=event.id WHERE my_event.userId=? AND ' +
    '((event.beginAt >= ? AND event.beginAt < ?) OR (event.beginAt < ? AND event.endAt > ?)) ' +
    'ORDER BY beginAt';

  const [rows] = await pool.execute(sql, [userId, firstDate, lastDate, firstDate, firstDate]);
  consoleLogger.info('selectMyEvents : query success');
  return rows;
}

// 내 이벤트에 등록돼 있으면 알림 정보 SELECT
export async function selectNotificationMyEvent(userId, eventId) {
  const sql = 'SELECT notification FROM my_event WHERE userId=? AND eventId=?';
  const [rows] = await pool.execute(sql, [userId, eventId]);
  consoleLogger.info(
    `selectExistsMyEvent : query success : isMyEvent checked for userId=${userId}, eventId=${eventId}`
  );
  return rows;
}

// my_event 테이블에서 entry delete
export async function deleteMyEvent(userId, eventId) {
  const sql = 'DELETE FROM my_event WHERE (userID=? AND eventID=?)';
  await pool.execute(sql, [userId, eventId]);
  consoleLogger.info(
    `deleteMyEvent : query success : deleted my_event entry userId=${userId}, eventId=${eventId}`
  );
}
