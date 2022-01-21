import { selectUser } from '../models/accessUserTable.js';

export default async function eventListController(req, res) {
  const user = await selectUser(res.locals.userId);

  res.render('eventList', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | EVENT LIST',
    username: user.name,
    profileImage: user.profileImage,
  });
}
