import selectUser from '../models/selectUser.js';
import consoleLogger from '../lib/consoleLogger.js';

export default async function indexController(req, res) {
  let user = await selectUser(res.locals.userId);

  if (!user) {
    consoleLogger.error('fail to get user data');
    user = { name: 'default', profileImage: '' };
  }

  res.status(200).render('index', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | ALL EVENTS',
    username: user.name,
    profileImage: user.profileImage,
  });
}
