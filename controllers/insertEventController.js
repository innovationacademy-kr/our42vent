import { insertEvent } from '../models/accessEventTable.js';
import consoleLogger from '../lib/consoleLogger.js';

export default async function insertEventController(req, res) {
  try {
    // 이벤트 form 에 작성된 내용 req.field 에 담겨있다
    const event = req.fields;
    // TODO: server side 사용자 input 유효성 검증
    event.id = await insertEvent(res.locals.userId, event);
    res.json(event);
  } catch (err) {
    consoleLogger.error(err.stack);
  }
}
