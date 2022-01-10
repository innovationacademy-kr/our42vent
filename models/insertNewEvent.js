import consoleLogger from '../controllers/consoleLogger.js';
import pool from '../config/createPool.js';

export default function insertNewUser(req, res, next) {
  // 이벤트 form 에 작성된 내용 req.body에 담겨있다
  const event = req.body;
  const sql =
    'INSERT INTO event ' +
    '(creator, title, personInCharge, beginAt, endAt, location, category, ' +
    'topic, details) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  consoleLogger.info('NEW EVENT DETAILS : ', event);

  // 이벤트 insert 쿼리
  pool
    .execute(sql, [
      res.locals.userId,
      event.title,
      event.personInCharge,
      event.beginAt,
      event.endAt,
      event.location,
      event.category,
      event.topic,
      event.details,
    ])
    .then(rows => consoleLogger.info('새 이벤트 생성!', rows))
    .catch(err => consoleLogger.error(`insert event : query error : ${err}`));
  next();
}
