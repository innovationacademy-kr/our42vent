export default async function insertNewUser(pool, user) {
  try {
    pool.getConnection(async (err, connection) => {
      if (err) throw err; // 연결되지 않았을 때
      const sql = 'INSERT INTO user SET ?';
      await connection.query(
        sql,
        { name: user.username, profileImage: user.profileImage },
        (err, rows, fields) => {
          connection.release();
          if (!err) {
            console.log('rows: ', rows);
            console.log('fields: ', fields);
          } else if (err.code === 'ER_DUP_ENTRY') {
            console.log(
              '=============================================\n' +
                `이미 등록돼 있는 사용자입니다!\n` +
                '============================================='
            );
          } else {
            console.error(`query error : ${err}`);
          }
        }
      );
    });
  } catch (err) {
    console.error(`Error in getConnection: ${err}`);
  }
}
