import consoleLogger from '../lib/consoleLogger.js';
import pool from '../config/createPool.js';

export function insertNewUser(user, next) {
  const sql = 'INSERT INTO user (id, name, profileImage) VALUES (?, ?, ?)';

  pool
    .execute(sql, [user.id, user.username, user.profileImage])
    .then((rows, fields) => {
      consoleLogger.info('rows: ', rows);
      next();
    })
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        consoleLogger.info('이미 등록돼 있는 사용자입니다!');
        next();
      } else {
        consoleLogger.error(`query error : ${err}`);
      }
    });
}

export async function selectUser(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  try {
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
  } catch (err) {
    consoleLogger.error(`Select token: query error: ${err}`);
    return null;
  }
}
