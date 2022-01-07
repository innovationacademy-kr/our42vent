import consoleLogger from '../controllers/consoleLogger.js';

export default function insertNewUser(pool, user) {
  try {
    pool.pool.getConnection((err, connection) => {
      if (err) throw err; // 연결되지 않았을 때
      const sql = 'INSERT INTO user SET ?';
      connection.query(
        sql,
        { id: 2, name: user.username, profileImage: user.profileImage },
        (err, rows, fields) => {
          connection.release();
          if (!err) {
            consoleLogger.info('rows: ', rows);
          } else if (err.code === 'ER_DUP_ENTRY') {
            consoleLogger.info(
              '=============================================\n' +
                `이미 등록돼 있는 사용자입니다!\n` +
                '============================================='
            );
          } else {
            consoleLogger.error(`query error : ${err}`);
          }
        }
      );
    });
  } catch (err) {
    consoleLogger.error(`Error in getConnection: ${err}`);
  }
}
