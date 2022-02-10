import schedule from 'node-schedule';
import { logger } from '../config/winston.js';
import { selectEvent } from '../models/accessEventTable.js';
import { insertMyEvent, deleteMyEvent } from '../models/accessMyEventTable.js';
import { selectPushSubscriptionByUser } from '../models/accessPushSubscriptionTable.js';

// 이벤트 구독 컨트롤러
export async function subscribeEventController(req, res, next) {
  const { notification } = req.body;
  const notificationNumber = notification === 'none' ? null : Number(notification);
  const { eventId } = req.params;

  try {
    // 알림 보낼 시간 sendAt 설정
    let sendAt = null;
    if (notificationNumber !== null) {
      const { beginAt } = await selectEvent(eventId);
      sendAt = new Date(beginAt - notificationNumber * 60000);
    }

    insertMyEvent(res.locals.userId, eventId, notificationNumber, sendAt);
    res.end();
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

// 구독 취소 컨트롤러
export async function unsubscribeEventController(req, res, next) {
  try {
    await deleteMyEvent(res.locals.userId, req.params.eventId);
    res.end();

    // 이미 알림이 스케줄 됐는데 사용자가 구독 취소한 경우 스케줄 된 알림 취소
    const pushSubArray = await selectPushSubscriptionByUser(res.locals.userId);
    const endPointArray = pushSubArray.map(obj => JSON.parse(obj.sub).endpoint);
    const jobs = schedule.scheduledJobs;
    const jobIdArray = Object.keys(jobs).filter(jobName =>
      endPointArray.includes(jobName.split('^')[1])
    );
    jobIdArray.forEach(id => jobs[id]?.cancel());
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
