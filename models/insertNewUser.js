export default async function insertNewUser(connection, user) {
  const sql = 'INSERT INTO user SET ?';
  connection.query(
    sql,
    { name: user.username, profileImage: user.profileImage },
    (err, rows, fields) => {
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
}
