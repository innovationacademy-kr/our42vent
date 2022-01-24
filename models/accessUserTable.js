import pool from '../config/createMySQLPool.js';
import consoleLogger from '../lib/consoleLogger.js';

export async function insertUser(user) {
  const sql = 'INSERT INTO user (id, name, profileImage) VALUES (?, ?, ?)';

  pool
    .execute(sql, [user.id, user.username, user.profileImage])
    .then(rows => consoleLogger.info('insertUser : query success : ', rows))
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        consoleLogger.info(
          `insertUser : (${user.id}, ${user.username}) : 이미 등록돼 있는 사용자입니다!`
        );
      } else {
        consoleLogger.error('insertUser : query error : ', err);
      }
    });
}

export async function selectUser(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  const [rows] = await pool.execute(sql, [id]);
  consoleLogger.info('selectUser : query success : ', rows);
  return rows[0];
}
