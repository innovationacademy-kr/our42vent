import consoleLogger from '../lib/consoleLogger.js';
import { deleteMyEvent } from '../models/accessMyEventTable.js';

export default async function myEventDeleteController(req, res) {
  try {
    await deleteMyEvent(res.locals.userId, req.params.eventId);

    res.end();
  } catch (err) {
    consoleLogger.error(err.stack);
    res.status(500).end();
  }
}
