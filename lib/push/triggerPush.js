import schedule from 'node-schedule';
import { logger } from '../../config/winston.js';
import { selectNextNotifications } from '../../models/accessMyEventTable.js';
import { sendPush } from './pushUtils.js';

// 매분 1분 후 보내야할 알림들 스케줄
export default async function triggerPush() {
  const now = new Date();
  const start = new Date(now.setMinutes(now.getMinutes() + 1, 0, 0));
  const pushInfoArray = await selectNextNotifications(start);

  pushInfoArray.forEach(info => {
    const { eventId, title, sendAt, sub, notification } = info;
    const subObj = JSON.parse(sub);
    const body = !notification
      ? '이벤트가 곧 시작합니다!'
      : `이벤트가 ${notification}분 후에 시작합니다!`;

    schedule.scheduleJob(`${eventId}^${subObj.endpoint}`, sendAt, () =>
      sendPush(title, body, subObj, sendAt)
    );
  });
}
