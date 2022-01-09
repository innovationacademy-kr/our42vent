import consoleLogger from '../controllers/consoleLogger.js';
import pool from '../config/createPool.js';

export default function insertNewUser(user, next) {
  const sql = 'INSERT INTO user (id, name, profileImage) VALUES (?, ?, ?)';

  pool
    .execute(sql, [user.id, user.username, user.profileImage])
    .then((rows, fields) => {
      consoleLogger.info('rows: ', rows);
      next();
    })
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        consoleLogger.info(
          '=============================================\n' +
            `이미 등록돼 있는 사용자입니다!\n` +
            '============================================='
        );
        next();
      } else {
        consoleLogger.error(`query error : ${err}`);
      }
    });
}
