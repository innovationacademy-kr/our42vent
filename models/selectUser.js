import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export default async function selectToken(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  try {
    const [rows] = await pool.query(sql, [4242]);
    return rows[0];
  } catch (err) {
    consoleLogger.error(`Select token: query error: ${err}`);
    return null;
  }
}
