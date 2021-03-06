import { selectUser } from '../models/accessUserTable.js';

export default async function indexController(req, res) {
  let user = await selectUser(res.locals.userId);

  if (!user) user = { name: 'anonymous', profileImage: '' };

  res.status(200).render('index', {
    layout: 'layouts/layout',
    title: '우리42벤트 | ALL EVENTS',
    username: user.name,
    profileImage: user.profileImage,
    referrer: '/',
  });
}
