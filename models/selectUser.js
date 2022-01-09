import consoleLogger from '../controllers/consoleLogger.js';
import pool from '../config/createPool.js';

export default async function selectUser(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
}
