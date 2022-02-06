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
  try {
    let user = await selectUser(res.locals.userId);

    if (!user) user = { name: 'anonymous', profileImage: '' };

    res.render('eventList', {
      layout: 'layouts/layout',
      title: '우리42벤트 | EVENT LIST',
      username: user.name,
      profileImage: user.profileImage,
      referrer: '/event/list',
    });
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}

export async function eventDeleteController(req, res) {
  try {
    const { eventId } = req.params;
    await deleteSubscriptions(eventId);
    await deleteEvent(eventId, res.locals.userId);

    res.end();
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}

export async function eventDataController(req, res) {
  try {
    const eventList = await selectCreatedEvents(res.locals.userId);

    res.json(eventList);
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}

export async function eventDetailController(req, res) {
  try {
    const { eventId } = req.params;
    const event = await selectEvent(eventId);
    const myEventNotification = await selectNotificationMyEvent(res.locals.userId, eventId);

    if (!myEventNotification.length) {
      event.isMyEvent = false;
    } else {
      event.isMyEvent = true;
      event.notification = myEventNotification[0].notification;
    }

    res.json(event);
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}

export async function eventEditController(req, res) {
  try {
    const event = req.fields;

    validateEventData(event);
    await updateEvent(event, req.params.eventId, res.locals.userId);
    res.end();
  } catch (err) {
    logger.warn(err.stack);
    if (err.name === 'InputError') res.status(400).end();
    else res.status(500).end();
  }
}

export async function eventInfoController(req, res) {
  try {
    res.cookie('eventId', req.params.eventId, { sameSite: 'strict' });
    res.redirect('/');
  } catch (err) {
    logger.warn(err.stack);
    res.status(500).end();
  }
}
