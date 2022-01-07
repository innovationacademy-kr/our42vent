import consoleLogger from '../controllers/consoleLogger.js';

export default function insertNewUser(pool, user) {
  const sql = 'INSERT INTO user SET ?';
  pool
    .query(sql, { id: user.id, name: user.username, profileImage: user.profileImage })
    .then((rows, fields) => consoleLogger.info('rows: ', rows))
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
