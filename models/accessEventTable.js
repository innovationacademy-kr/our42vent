import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

// 해당 월 범위 안에 있는 이벤트 select
export async function selectMonthEvents(firstDate, lastDate) {
  const sql =
    'SELECT id, title, beginAt, endAt, category FROM event ' +
    'WHERE (beginAt >= ? AND beginAt < ?) OR (beginAt < ? AND endAt > ?) ORDER BY beginAt';
  const [rows] = await pool.execute(sql, [firstDate, lastDate, firstDate, firstDate]);
  logger.info('selectMonthEvent : query success');
  return rows;
}

// 해당 사용자가 만든 이벤트 select
export async function selectCreatedEvents(creatorId) {
  const sql =
    'SELECT title, location, beginAt, endAt, category, id FROM event ' +
    'WHERE creator=? ORDER BY beginAt ';

  const [rows] = await pool.execute(sql, [creatorId]);
  logger.info(`selectUserEvent : query success : creator ${creatorId} has ${rows.length} events`);
  return rows;
}

export async function selectEvent(eventId) {
  const sql =
    'SELECT title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details, creator FROM event WHERE id=?';

  const [[rows]] = await pool.execute(sql, [eventId]);
  logger.info(`selectEvent : query success : ${JSON.stringify(rows)}`);
  return rows;
}

// eventId 기반으로 이벤트 삭제
export async function deleteEvent(eventId, userId) {
  const sql = `DELETE FROM event WHERE id=? AND creator=?`;

  const [deleted] = await pool.execute(sql, [eventId, userId]);
  logger.info(`deleteEvent : query success : deleted user=${userId}'s event=${eventId}`);
  return deleted.affectedRows;
}

// 이벤트 insert 쿼리
export async function insertEvent(userId, event) {
  const { title, personInCharge, beginAt, endAt, location, category, topic, details } = event;
  logger.info(`insertEvent : event details : ${JSON.stringify(event)}`);

  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  const [rows] = await pool.execute(sql, [
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
  logger.info(`insertEvent : query success : ${JSON.stringify(rows)}`);
  return rows.insertId; // db에 insert된 data의 pk
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
  logger.info(`updateEvent : query success : ${JSON.stringify(rows)}`);
}
