import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export default function insertNewToken(id, token) {
  const sql =
    'INSERT INTO token (userId, content) VALUES (?, ?)' +
    'ON DUPLICATE KEY UPDATE content=?, expireAt=DATE_ADD(NOW(), INTERVAL 2 WEEK)';

  pool
    .execute(sql, [id, token, token]) // 14 days
    .then(rows => consoleLogger.info('Insert new token success : ', rows))
    .catch(err => consoleLogger.error(`Insert new token : query error : ${err}`));
}
