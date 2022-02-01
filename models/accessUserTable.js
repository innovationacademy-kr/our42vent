import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

export async function insertUser(user) {
  const sql = 'INSERT INTO user (id, name, profileImage) VALUES (?, ?, ?)';

  pool
    .execute(sql, [user.id, user.username, user.profileImage])
    .then(rows => logger.info(`insertUser : query success : ${JSON.stringify(rows)}`))
    .catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        logger.info(`insertUser : (${user.id}, ${user.username}) : 이미 등록돼 있는 사용자입니다!`);
      } else {
        throw err;
      }
    });
}

export async function selectUser(id) {
  const sql = 'SELECT id, name, profileImage FROM USER WHERE id=?';

  const [[rows]] = await pool.execute(sql, [id]);
  logger.info(`selectUser : query success : ${JSON.stringify(rows)}`);
  return rows;
}
