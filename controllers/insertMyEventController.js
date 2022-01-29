import consoleLogger from '../lib/consoleLogger.js';
import { insertMyEvent } from '../models/accessMyEventTable.js';

export default function insertMyEventController(req, res) {
  const notiOption = req.body.notification;
  const notification = notiOption === 'none' ? null : Number(notiOption);

  try {
    insertMyEvent(res.locals.userId, req.params.eventId, notification);
    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}
