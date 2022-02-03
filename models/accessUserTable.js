import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

export async function insertUser(user) {
  const sql =
    'INSERT INTO user (id, name, profileImage) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE profileImage=?;';

  const [rows] = await pool.execute(sql, [
    user.id,
    user.username,
    user.profileImage,
    user.profileImage,
  ]);
  logger.info(`insertUser : query success : ${JSON.stringify(rows)}`);
}

export async function selectUser(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  const [[rows]] = await pool.execute(sql, [id]);
  logger.info(`selectUser : query success : ${JSON.stringify(rows)}`);
  return rows;
}
