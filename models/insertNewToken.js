import consoleLogger from '../controllers/consoleLogger.js';
import pool from '../config/createPool.js';

export default function insertNewToken(id, token) {
  const sql = 'INSERT INTO token (userId, content) VALUES (?, ?)';

  pool
    .execute(sql, [id, token])
    .then(rows => consoleLogger.info('rows: ', rows))
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        consoleLogger.info(
          '=============================================\n' +
            `이미 등록된 토큰입니다!\n` +
            '============================================='
        );
      } else {
        consoleLogger.error(`Insert new token : query error : ${err}`);
      }
    });
}
