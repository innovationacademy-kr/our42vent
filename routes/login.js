import express from 'express';

export default function loginRoute(passport) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/', (req, res) => {
    res.status(200).render('login', {
      layout: false,
      title: '우리42벤트 | LOGIN',
    });
  });

  // 42 OAuth 2.0
  router.get('/42', passport.authenticate('42'));
  router.get(
    '/42/return',
    passport.authenticate('42', { successRedirect: '/', failureRedirect: '/login' })
  );
  return router;
}
