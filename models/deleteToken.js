import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export default function deleteToken(id) {
  const sql = 'DELETE FROM token where userId=?';

  pool
    .execute(sql, [id])
    .then(rows => consoleLogger.info('Delete token success : ', rows))
    .catch(err => consoleLogger.error(`Delete token : query error : ${err}`));
}
