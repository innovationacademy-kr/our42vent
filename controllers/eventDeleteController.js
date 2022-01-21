import consoleLogger from '../lib/consoleLogger.js';
import { deleteEvent } from '../models/accessEventTable.js';

export default async function eventDeleteController(req, res) {
  consoleLogger.warn(req.body.event);
  await deleteEvent(req.body.eventId);

  res.end();
}
