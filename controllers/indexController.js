import selectUser from '../models/selectUser.js';

export default async function indexController(req, res) {
  const user = await selectUser(res.locals.userId);

  res.status(200).render('index', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | ALL EVENTS',
    username: user.name,
    profileImage: user.profileImage,
  });
}
