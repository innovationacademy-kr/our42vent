import { logger } from '../config/winston.js';
import { insertMyEvent, deleteMyEvent } from '../models/accessMyEventTable.js';

// 이벤트 등록 컨트롤러
export async function subscribeEventController(req, res) {
  const notiOption = req.body.notification;
  const notification = notiOption === 'none' ? null : Number(notiOption);

  try {
    insertMyEvent(res.locals.userId, req.params.eventId, notification);
    res.end();
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}

// 등록 취소 컨트롤러
export async function unsubscribeEventController(req, res) {
  try {
    deleteMyEvent(res.locals.userId, req.params.eventId);
    res.end();
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}
