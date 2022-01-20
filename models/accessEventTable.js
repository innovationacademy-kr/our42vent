import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// 해당 월 범위 안에 있는 이벤트 select
export async function selectMonthEvents(firstDate, lastDate) {
  try {
    const sql =
      'SELECT id, title, beginAt, endAt, category FROM event ' +
      'WHERE beginAt >= ? AND beginAt < ? OR beginAt < ? AND endAt > ? ORDER BY beginAt';
    const [rows] = await pool.execute(sql, [firstDate, lastDate, firstDate, firstDate]);
    consoleLogger.info('SELECT MONTH EVENT : query success : ', rows);
    return rows;
  } catch (err) {
    consoleLogger.error(`SELECT MONTH EVENT : query error : ${err}`);
    return err;
  }
}

// 이벤트 insert 쿼리
export function insertEvent(userId, event) {
  consoleLogger.info('insertEvent : event details : ', event);

  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

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
