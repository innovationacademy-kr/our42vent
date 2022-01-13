import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

// 처음 & 마지막 날 범위 안에 시작하는 이벤트 select
export default async function selectMonthEvents(firstDate, lastDate) {
  try {
    const sql =
      'SELECT id, title, beginAt, endAt FROM event ' +
      'WHERE beginAt >= ? AND beginAt < ? ORDER BY beginAt';
    const [rows] = await pool.execute(sql, [firstDate, lastDate]);
    consoleLogger.info('SELECT MONTH EVENT : success : ', rows);
    return rows;
  } catch (err) {
    consoleLogger.error(`SELECT MONTH EVENT : query error : ${err}`);
    return err;
  }
}
