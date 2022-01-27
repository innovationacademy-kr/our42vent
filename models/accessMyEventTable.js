import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// my event insert
export default function insertMyEvent(userId, eventId, notification) {
  consoleLogger.info(`insertMyEvent : eventId=${eventId}, notification=${notification} `);

  const sql = 'INSERT INTO my_event (eventId, userId, notification) VALUES (?, ?, ?);';

  pool
    .execute(sql, [eventId, userId, notification])
    .then(rows => consoleLogger.info('insertMyEvent : query success : ', rows))
    .catch(err => consoleLogger.error('insertMyEvent : qeury error : ', err));
}
