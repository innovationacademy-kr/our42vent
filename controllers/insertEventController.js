import { logger } from '../config/winston.js';
import validateEventData from '../lib/validateEventData.js';
import { insertEvent } from '../models/accessEventTable.js';

export default async function insertEventController(req, res, next) {
  try {
    // 이벤트 form 에 작성된 내용이 req.fields 에 담겨있다
    const event = req.fields;

    // 새 이벤트 구독전, 서버에서 이벤트폼 Input 유효성 검증
    validateEventData(event);
    event.id = await insertEvent(res.locals.userId, event);
    res.json(event);
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
