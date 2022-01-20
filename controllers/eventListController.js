import { selectUser } from '../models/accessUserTable.js';
import { selectUserEvents } from '../models/accessEventTable.js';

export default async function insertEventController(req, res) {
  const user = await selectUser(res.locals.userId);

  res.render('eventList', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | EVENT LIST',
    username: user.name,
    profileImage: user.profileImage,
  });
}
