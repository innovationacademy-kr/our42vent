import { logger } from '../config/winston.js';
import { cancelScheduledPushes } from '../lib/push/pushUtils.js';
import validateEventData from '../lib/validateEventData.js';
import {
  deleteEvent,
  selectCreatedEvents,
  selectEvent,
  updateEvent,
} from '../models/accessEventTable.js';
import {
  selectNotificationMyEvent,
  deleteSubscriptions,
  updateSendAtOnEdit,
} from '../models/accessMyEventTable.js';
import { selectUser } from '../models/accessUserTable.js';

export async function eventListController(req, res) {
  let user = await selectUser(res.locals.userId);

  if (!user) user = { name: 'anonymous', profileImage: '' };

  res.status(200).render('eventList', {
    layout: 'layouts/layout',
    title: '우리42벤트 | EVENT LIST',
    username: user.name,
    profileImage: user.profileImage,
    referrer: '/event/list',
  });
}

export async function eventDeleteController(req, res, next) {
  try {
    const { eventId } = req.params;
    await deleteSubscriptions(eventId);

    const affectedRows = await deleteEvent(eventId, res.locals.userId);
    if (!affectedRows) res.status(405);

    res.status(200).end();

    cancelScheduledPushes(eventId);
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

export async function eventDataController(req, res, next) {
  try {
    const eventList = await selectCreatedEvents(res.locals.userId);

    res.json(eventList);
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

export async function eventDetailController(req, res, next) {
  try {
    const { eventId } = req.params;
    const event = await selectEvent(eventId);

    if (!event) {
      if ('cors'.localeCompare(req.get('Sec-Fetch-Mode'))) res.redirect('/error/404');
      res.status(404).end();
    } else {
      const myEventNotification = await selectNotificationMyEvent(res.locals.userId, eventId);

      if (!myEventNotification.length) event.isMyEvent = false;
      else {
        event.isMyEvent = true;
        event.notification = myEventNotification[0].notification;
      }

      res.json(event);
    }
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

export async function eventEditController(req, res, next) {
  try {
    const event = req.fields;
    const { userId } = res.locals;
    const { eventId } = req.params;

    validateEventData(event);
    const newBeginAt = new Date(event.beginAt);
    const { beginAt } = await selectEvent(req.params.eventId);
    await updateEvent(event, eventId, userId);
    res.end();

    if (beginAt !== newBeginAt) {
      updateSendAtOnEdit(eventId, newBeginAt);
      cancelScheduledPushes(eventId);
    }
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

export async function eventInfoController(req, res, next) {
  try {
    res.cookie('eventId', req.params.eventId, { sameSite: 'strict' });
    res.redirect('/');
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
