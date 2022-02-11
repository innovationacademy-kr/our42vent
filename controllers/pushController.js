import { logger } from '../config/winston.js';
import { sendPush } from '../lib/push/pushUtils.js';
import { updateRemoveNotification } from '../models/accessMyEventTable.js';
import {
  deletePushSubscription,
  insertPushSubscription,
  selectPushSubscription,
} from '../models/accessPushSubscriptionTable.js';

// 알림 설정 켜졌을 때 & pushToken cookie flag 로 client 가 보낸 subscription 객체와 db 에 있는 객체 sync
export async function subscribePushController(req, res, next) {
  try {
    const { userId } = res.locals;
    const { subscription, isFirst } = req.body;

    // 다른 사용자가 이미 점유된 환경에서 알림 설정 켜진 걸로 인식 될 경우
    const subscriptionRow = await selectPushSubscription(JSON.stringify(subscription));
    if (subscriptionRow && Number(userId) !== subscriptionRow.userId) {
      res.status(403).end();
      return;
    }

    // push subscription 객체 db 에 저장
    await insertPushSubscription(userId, JSON.stringify(subscription));

    res.cookie('pushToken', userId, {
      secure: true,
      expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
      sameSite: 'strict',
      signed: true,
    });

    res.status(201).end();

    // 알림 설정 성공 알림 send
    if (isFirst)
      sendPush(
        '이벤트 알림 ON',
        '구독한 이벤트가 시작하기 전 설정한 시간에 알림을 받을 수 있습니다.',
        subscription
      );
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

// 알림 설정 껐을 때 db 업데이트
export async function unsubscribePushController(req, res, next) {
  try {
    const subscription = req.body;
    const affectedRows = await deletePushSubscription(JSON.stringify(subscription));
    if (!affectedRows) res.status(405);
    await updateRemoveNotification(res.locals.userId);
    res.end();
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
