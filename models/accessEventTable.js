import pool from '../config/createPool.js';
import consoleLogger from '../lib/consoleLogger.js';

export default function insertEvent(userId, event) {
  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  consoleLogger.info('insertEvent : event details : ', event);

  // 이벤트 insert 쿼리
  pool
    .execute(sql, [
      userId,
      event.title,
      event.personInCharge,
      event.beginAt,
      event.endAt,
      event.location,
      event.category,
      event.topic,
      event.details,
    ])
    .then(rows => consoleLogger.info('insertEvent : query success : ', rows))
    .catch(err => consoleLogger.error('insertEvent : query error : ', err));
}
