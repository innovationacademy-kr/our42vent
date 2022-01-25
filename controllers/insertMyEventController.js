import insertMyEvent from '../models/accessMyEventTable.js';

export default function insertMyEventController(req, res) {
  insertMyEvent(res.locals.userId, req.params.eventId, req.body.notification);

  res.end();
}
