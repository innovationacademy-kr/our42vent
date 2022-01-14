import { insertEvent } from '../models/accessEventTable.js';

export default function insertEventController(req, res) {
  // 이벤트 form 에 작성된 내용 req.field 에 담겨있다
  const event = req.fields;
  // TODO: server side 사용자 input 유효성 검증
  insertEvent(res.locals.userId, event);

  res.end();
}
