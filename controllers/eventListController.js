import { selectUser } from '../models/accessUserTable.js';
import {
  selectEvent,
  selectUserEvents,
  deleteEvent,
  updateEvent,
} from '../models/accessEventTable.js';

export async function eventListController(req, res) {
  const user = await selectUser(res.locals.userId);

  res.render('eventList', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | EVENT LIST',
    username: user.name,
    profileImage: user.profileImage,
  });
}

export async function eventDeleteController(req, res) {
  await deleteEvent(req.body.eventId, res.locals.userId);

  res.end();
}

export async function eventCreatorController(req, res) {
  const eventList = await selectUserEvents(res.locals.userId);

  res.json(eventList);
}

export async function eventPreviewEditController(req, res) {
  const event = await selectEvent(req.params.eventId);

  res.json(event);
}

export async function eventEditController(req, res) {
  const event = req.fields;
  await updateEvent(event, req.params.eventId, res.locals.userId);

  res.end();
}
