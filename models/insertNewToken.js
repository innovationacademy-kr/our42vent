import consoleLogger from '../controllers/consoleLogger.js';
import pool from '../config/createPool.js';

export default function insertNewToken(id, token) {
  const sql = 'INSERT INTO token (userId, content) VALUES (?, ?)';

  pool
    .execute(sql, [id, token])
    .then((rows, fields) => {
      consoleLogger.info('rows: ', rows);
    })
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        consoleLogger.info(
          '=============================================\n' +
            `이미 등록돼 있는 사용자입니다!\n` +
            '============================================='
        );
      } else {
        consoleLogger.error(`query error : ${err}`);
      }
    });
}
