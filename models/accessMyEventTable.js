import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// my event insert
export function insertMyEvent(userId, eventId, notification) {
  consoleLogger.info(`insertMyEvent : eventId=${eventId}, notification=${notification} `);

  const sql = 'INSERT INTO my_event (eventId, userId, notification) VALUES (?, ?, ?);';

  pool
    .execute(sql, [eventId, userId, notification])
    .then(rows => consoleLogger.info('insertMyEvent : query success : ', rows))
    .catch(err => consoleLogger.error('insertMyEvent : qeury error : ', err));
}

export async function selectExistsMyEvent(userId, eventId) {
  const sql = 'SELECT EXISTS (SELECT id FROM my_event WHERE userId=? AND eventId=?)';
  const [[rows]] = await pool.execute(sql, [userId, eventId]);
  consoleLogger.info(
    `selectExistsMyEvent : query success : isMyEvent checked for userId=${userId}, eventId=${eventId}`
  );
  return Object.values(rows)[0];
}

export async function deleteMyEvent(userId, eventId) {
  const sql = 'DELETE FROM my_event WHERE (userID=? AND eventID=?)';
  await pool.execute(sql, [userId, eventId]);
  consoleLogger.info(
    `deleteMyEvent : query success : deleted my_event entry userId=${userId}, eventId=${eventId}`
  );
}
