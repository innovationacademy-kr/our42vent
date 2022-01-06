import insertNewUser from '../models/insertNewUser.js';

export default function indexController(req, res, pool) {
  const { registeredUser } = req.session.passport.user;

  // 사용자 db 등록 여부 확인
  if (registeredUser === false) {
    insertNewUser(pool, req.user);
    req.session.passport.user.registeredUser = true;
  }
  res.status(200).render('index', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | ALL EVENTS',
    username: req.user.username,
    profileImage: req.user.profileImage,
  });
}
