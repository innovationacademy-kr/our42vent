import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

// 처음 & 마지막 날 범위 안에 시작하는 이벤트 select
export async function selectMonthEvents(firstDate, lastDate) {
  try {
    const sql =
      'SELECT id, title, beginAt, endAt FROM event ' +
      'WHERE beginAt >= ? AND beginAt < ? ORDER BY beginAt';

    const [rows] = await pool.execute(sql, [firstDate, lastDate]);
    consoleLogger.info('SELECT MONTH EVENT : query success : ', rows);
    return rows;
  } catch (err) {
    consoleLogger.error(`SELECT MONTH EVENT : query error : ${err}`);
    return err;
  }
}

// 해당 사용자가 만든 이벤트 select
export async function selectUserEvents(creatorId) {
  try {
    const sql =
      'SELECT title, location, beginAt, endAt, category, id FROM event ' +
      'WHERE creator=? ORDER BY beginAt ';

    const [rows] = await pool.execute(sql, [creatorId]);
    consoleLogger.info('selectUserEvent : query success : ', rows);
    return rows;
  } catch (err) {
    consoleLogger.error('selectUserEvent : query error : ', err);
    return null;
  }
}

export async function selectEvent(eventId) {
  try {
    const sql =
      'SELECT title, personInCharge, beginAt, endAt, location, category, ' +
      'topic, details, creator FROM event WHERE id=?';

    const [[rows]] = await pool.execute(sql, [eventId]);
    consoleLogger.info('selectEvent : query success : ', rows);
    return rows;
  } catch (err) {
    consoleLogger.error('selectEvent : query error : ', err);
    return null;
  }
}
// eventId 기반으로 이벤트 삭제
export async function deleteEvent(eventId, userId) {
  try {
    const sql = `DELETE FROM event WHERE id=? AND creator=?`;

    const [rows] = await pool.execute(sql, [eventId, userId]);
    consoleLogger.info('deleteEvent : query success : ', rows);
  } catch (err) {
    consoleLogger.error('deleteEvent : query error : ', err);
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

export async function updateEvent(event, eventId, userId) {
  const sql =
    'UPDATE event ' +
    'SET title=?, personInCharge=?, beginAt=?, endAt=?, location=?, category=?, ' +
    'topic=?, details=? ' +
    'WHERE id=? AND creator=?';

  pool
    .execute(sql, [
      event.title,
      event.personInCharge,
      event.beginAt,
      event.endAt,
      event.location,
      event.category,
      event.topic,
      event.details,
      eventId,
      userId,
    ])
    .then(rows => consoleLogger.info('updateEvent : query success : ', rows))
    .catch(err => consoleLogger.error('updateEvent : query error : ', err));
}
