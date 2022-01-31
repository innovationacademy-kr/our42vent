import consoleLogger from '../lib/consoleLogger.js';
import validateEventData from '../lib/validateEventData.js';
import { insertEvent } from '../models/accessEventTable.js';

export default async function insertEventController(req, res) {
  try {
    // 이벤트 form 에 작성된 내용 req.field 에 담겨있다
    const event = req.fields;

    // 새 이벤트 등록전, 서버에서 이벤트폼 Input 유효성 검증
    validateEventData(event);
    await insertEvent(res.locals.userId, event);
    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    if (err.name === 'InputError') res.status(400).end();
    else res.status(500).end();
  }
}
