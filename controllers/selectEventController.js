import { selectEventDetails } from '../models/accessEventTable.js';

export default async function selectEventController(req, res) {
  try {
    const eventDetails = await selectEventDetails(req.params.id);

    return res.json(eventDetails);
  } catch (err) {
    return res.status(500).end();
  }
}
