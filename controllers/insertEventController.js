import consoleLogger from '../lib/consoleLogger.js';
import validateBeforeInsertEvent from '../lib/validateBeforeInsertOrEdit.js';
import { insertEvent } from '../models/accessEventTable.js';

export default async function insertEventController(req, res) {
  try {
    // 이벤트 form 에 작성된 내용 req.field 에 담겨있다
    const event = req.fields;

    event.beginAt = '05 October 2011 14:48 UTC';
    console.log(event);
    validateBeforeInsertEvent(event);
    console.log(event.beginAt);
    await insertEvent(res.locals.userId, event);
    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    if (err.name === 'InputError') res.status(400).end();
    else res.status(500).end();
  }
}
