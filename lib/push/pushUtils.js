import schedule from 'node-schedule';
import webpush from 'web-push';
import { logger } from '../../config/winston.js';
import { deletePushSubscription } from '../../models/accessPushSubscriptionTable.js';

// webpush 초기 설정
webpush.setVapidDetails(
  'mailto:our42vent@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// 스케줄된 알림 send
export function sendPush(title, body, subscription, sendAt = null) {
  const pushPayload = JSON.stringify({ title, body });

  const ttl = sendAt ? Math.ceil(sendAt.getTime() - new Date() / 1000) + 20 : 10;

  webpush.sendNotification(subscription, pushPayload, { TTL: ttl }).catch(err => {
    deletePushSubscription(JSON.stringify(subscription));
    logger.warn(`${err.statusCode} ${err.message}`);
  });
}

// 해당 event 스케줄 된 알림 취소
export function cancelScheduledPushes(eventId) {
  const jobs = schedule.scheduledJobs;
  const jobIdArray = Object.keys(jobs).filter(jobName => jobName.split('^', 1)[0] === eventId);
  jobIdArray.forEach(id => jobs[id]?.cancel());
}
