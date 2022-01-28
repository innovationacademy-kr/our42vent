import consoleLogger from '../lib/consoleLogger.js';
import {
  deleteEvent,
  selectCreatedEvents,
  selectEvent,
  updateEvent,
} from '../models/accessEventTable.js';
import { selectExistsMyEvent } from '../models/accessMyEventTable.js';
import { selectUser } from '../models/accessUserTable.js';

export async function eventListController(req, res) {
  try {
    const user = await selectUser(res.locals.userId);

    res.render('eventList', {
      layout: 'layouts/desktopLayout',
      title: '우리42벤트 | EVENT LIST',
      username: user.name,
      profileImage: user.profileImage,
    });
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}

export async function eventDeleteController(req, res) {
  try {
    await deleteEvent(req.params.eventId, res.locals.userId);

    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}

export async function eventDataController(req, res) {
  try {
    const eventList = await selectCreatedEvents(res.locals.userId);

    res.json(eventList);
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}

export async function eventDetailController(req, res) {
  try {
    const { eventId } = req.params;
    const event = await selectEvent(eventId);
    event.isMyEvent = await selectExistsMyEvent(res.locals.userId, eventId);
    res.json(event);
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}

export async function eventEditController(req, res) {
  try {
    const event = req.fields;
    await updateEvent(event, req.params.eventId, res.locals.userId);

    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}
