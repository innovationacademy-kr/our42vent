import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export default async function selectToken(id) {
  const sql = 'SELECT content FROM token WHERE userId=?';

  try {
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  } catch (err) {
    consoleLogger.error(`Select token: query error: ${err}`);
    return null;
  }
}
