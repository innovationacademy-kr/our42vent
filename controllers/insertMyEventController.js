import insertMyEvent from '../models/accessMyEventTable.js';

export default function insertMyEventController(req, res) {
  const myEventInfo = req.body;
  insertMyEvent(res.locals.userId, myEventInfo);

  res.end();
}
