import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

// my_event 테이블에 INSERT
export async function insertMyEvent(userId, eventId, notification, sendAt) {
  logger.info(
    `insertMyEvent : try inserting eventId=${eventId}, notification=${notification}, sendAt=${sendAt} `
  );

  const sql = 'INSERT INTO my_event (eventId, userId, notification, sendAt) VALUES (?, ?, ?, ?);';

  const rows = await pool.execute(sql, [eventId, userId, notification, sendAt]);
  logger.info(`insertMyEvent : query success : ${JSON.stringify(rows)}`);
}

// 내가 구독한 이벤트 SELECT
export async function selectMyEvents(userId, firstDate, lastDate) {
  const sql =
    'SELECT event.id, title, beginAt, endAt, category FROM event ' +
    'INNER JOIN my_event ON my_event.eventId=event.id WHERE my_event.userId=? AND ' +
    '((event.beginAt >= ? AND event.beginAt < ?) OR (event.beginAt < ? AND event.endAt > ?)) ' +
    'ORDER BY beginAt';

  const [rows] = await pool.execute(sql, [userId, firstDate, lastDate, firstDate, firstDate]);
  logger.info('selectMyEvents : query success');
  return rows;
}

// 내 이벤트에 구독돼 있으면 알림 정보 SELECT
export async function selectNotificationMyEvent(userId, eventId) {
  const sql = 'SELECT notification FROM my_event WHERE userId=? AND eventId=?';
  const [rows] = await pool.execute(sql, [userId, eventId]);
  logger.info(
    `selectExistsMyEvent : query success : isMyEvent checked for userId=${userId}, eventId=${eventId}`
  );
  return rows;
}

// my_event 테이블에서 entry delete
export async function deleteMyEvent(userId, eventId) {
  const sql = 'DELETE FROM my_event WHERE (userID=? AND eventID=?)';
  await pool.execute(sql, [userId, eventId]);
  logger.info(
    `deleteMyEvent : query success : deleted my_event entry userId=${userId}, eventId=${eventId}`
  );
}

export async function deleteSubscriptions(eventId) {
  const sql = 'DELETE FROM my_event WHERE eventID=?';

  await pool.execute(sql, [eventId]);
  logger.info(
    `deleteSubscribedEvent : query success : deleted event entry eventId=${eventId} in my_event`
  );
}

export async function selectNextNotifications(start) {
  const sql =
    'SELECT notification, event.title, eventId, ps.sub FROM my_event ' +
    'INNER JOIN event ON eventId=event.id INNER JOIN push_subscription AS ps ON ' +
    'my_event.userId=ps.userId WHERE sendAt=?';

  const [rows] = await pool.execute(sql, [start]);
  return rows;
}

export async function updateSendAtOnEdit(eventId, beginAt) {
  const sql =
    'UPDATE MY_EVENT SET sendAt=(? - INTERVAL notification MINUTE) ' +
    'WHERE eventId=? AND notification IS NOT NULL';
  const [rows] = await pool.execute(sql, [beginAt, eventId]);
  logger.info(`updateSendAtOnEdit : query success : ${JSON.stringify(rows)}`);
}

export async function updateRemoveNotification(userId) {
  const sql = 'UPDATE MY_EVENT SET notification=NULL, sendAt=NULL WHERE userID=?';
  const [rows] = await pool.execute(sql, [userId]);
  logger.info(`updateRemoveNotification : query success : ${JSON.stringify(rows)}`);
}
