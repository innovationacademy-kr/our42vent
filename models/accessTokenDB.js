import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export function insertToken(id, token) {
  const sql =
    'INSERT INTO token (userId, content) VALUES (?, ?)' +
    'ON DUPLICATE KEY UPDATE content=?, expireAt=DATE_ADD(NOW(), INTERVAL 2 WEEK)';

  pool
    .execute(sql, [id, token, token])
    .then(rows => consoleLogger.info('Insert new token success : ', rows))
    .catch(err => consoleLogger.error(`Insert new token : query error : ${err}`));
}

export function deleteToken(id) {
  const sql = 'DELETE FROM token where userId=?';

  pool
    .execute(sql, [id])
    .then(rows => consoleLogger.info('Delete token success : ', rows))
    .catch(err => consoleLogger.error(`Delete token : query error : ${err}`));
}

export async function selectToken(id) {
  const sql = 'SELECT content FROM token WHERE userId=?';

  try {
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  } catch (err) {
    consoleLogger.error(`Select token: query error: ${err}`);
    return null;
  }
}
