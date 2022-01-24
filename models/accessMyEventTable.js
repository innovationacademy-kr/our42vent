import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// my event insert
export default function insertMyEvent(userId, myEventInfo) {
  consoleLogger.info('insertMyEvent : my event info : ', myEventInfo);

  const sql = 'INSERT INTO my_event (eventId, userId, notification) VALUES (?, ?, ?);';

  pool
    .execute(sql, [myEventInfo.eventId, userId, myEventInfo.notification])
    .then(rows => consoleLogger.info('insertMyEvent : query success : ', rows))
    .catch(err => consoleLogger.error('insertMyEvent : qeury error : ', err));
}
