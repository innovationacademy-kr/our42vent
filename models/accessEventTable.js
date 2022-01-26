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

// 해당 사용자가 만든 이벤트 select
export async function selectCreatedEvents(creatorId) {
  const sql =
    'SELECT title, location, beginAt, endAt, category, id FROM event ' +
    'WHERE creator=? ORDER BY beginAt ';

  const [rows] = await pool.execute(sql, [creatorId]);
  consoleLogger.info(
    'selectUserEvent : query success : ',
    `creator ${creatorId} has ${rows.length} events`
  );
  return rows;
}

export async function selectEvent(eventId) {
  const sql =
    'SELECT title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details, creator FROM event WHERE id=?';

  const [[rows]] = await pool.execute(sql, [eventId]);
  consoleLogger.info('selectEvent : query success : ', rows);
  return rows;
}

// eventId 기반으로 이벤트 삭제
export async function deleteEvent(eventId, userId) {
  const sql = `DELETE FROM event WHERE id=? AND creator=?`;

  const [rows] = await pool.execute(sql, [eventId, userId]);
  consoleLogger.info('deleteEvent : query success : ', rows.length);
}

// 이벤트 insert 쿼리
export async function insertEvent(userId, event) {
  const { title, personInCharge, beginAt, endAt, location, category, topic, details } = event;
  consoleLogger.info('insertEvent : event details : ', event);

  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  const rows = await pool.execute(sql, [
    userId,
    title,
    personInCharge,
    beginAt,
    endAt,
    location,
    category,
    topic,
    details,
  ]);
  consoleLogger.info('insertEvent : query success : ', rows);
}

export async function updateEvent(event, eventId, userId) {
  const { title, personInCharge, beginAt, endAt, location, category, topic, details } = event;
  const sql =
    'UPDATE event ' +
    'SET title=?, personInCharge=?, beginAt=?, endAt=?, location=?, category=?, ' +
    'topic=?, details=? ' +
    'WHERE id=? AND creator=?';

  const [rows] = await pool.execute(sql, [
    title,
    personInCharge,
    beginAt,
    endAt,
    location,
    category,
    topic,
    details,
    eventId,
    userId,
  ]);
  consoleLogger.info('updateEvent : query success : ', rows);
}
