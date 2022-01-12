import pool from '../config/createPool.js';
import consoleLogger from '../lib/consoleLogger.js';

export function insertToken(id, token) {
  const sql =
    'INSERT INTO token (userId, content) VALUES (?, ?)' +
    'ON DUPLICATE KEY UPDATE content=?, expireAt=DATE_ADD(NOW(), INTERVAL 2 WEEK)';

  pool
    .execute(sql, [id, token, token])
    .then(rows => consoleLogger.info('insertToken : query success : ', rows))
    .catch(err => consoleLogger.error('insertToken : query error : ', err));
}

export function deleteToken(id) {
  const sql = 'DELETE FROM token where userId=?';

  pool
    .execute(sql, [id])
    .then(rows => consoleLogger.info('deleteToken : query success : ', rows))
    .catch(err => consoleLogger.error('deleteToken : query error : ', err));
}

export async function selectToken(id) {
  const sql = 'SELECT content FROM token WHERE userId=?';

  try {
    const [rows] = await pool.execute(sql, [id]);
    consoleLogger.info('selectToken : query success : ', rows);
    return rows[0];
  } catch (err) {
    consoleLogger.error('selectToken: query error : ', err);
    return null;
  }
}
