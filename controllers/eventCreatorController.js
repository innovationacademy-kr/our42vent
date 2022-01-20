import { selectUser } from '../models/accessUserTable.js';
import { selectUserEvents } from '../models/accessEventTable.js';

export default async function insertEventController(req, res) {
  const eventList = await selectUserEvents(res.locals.userId);

  res.json(eventList);
}
