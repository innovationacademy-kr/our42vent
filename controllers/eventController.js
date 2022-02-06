import { logger } from '../config/winston.js';
import validateEventData from '../lib/validateEventData.js';
import {
  deleteEvent,
  selectCreatedEvents,
  selectEvent,
  updateEvent,
} from '../models/accessEventTable.js';
import { selectNotificationMyEvent, deleteSubscriptions } from '../models/accessMyEventTable.js';
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
    const deleted = await deleteEvent(eventId, res.locals.userId);
    if (!deleted.affectedRows) res.status(405);

    res.end();
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

    // TODO : 바로 페이지로 접근하면 크롬 자체에서 에러를 뱉음... error page redirection 고민해보기...
    if (!event) res.status(404).end();
    else {
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
    validateEventData(event);
    await updateEvent(event, req.params.eventId, res.locals.userId);

    res.end();
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}

export async function eventInfoController(req, res, next) {
  try {
    res.cookie('eventId', req.params.eventId);
    res.redirect('/');
  } catch (err) {
    logger.warn(err.stack);
    next(err);
  }
}
