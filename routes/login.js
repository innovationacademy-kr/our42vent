export default function loginRoute(express, passport) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/', (req, res) => {
    res.status(200).render('login', { layout: false });
  });

  // 42 OAuth 2.0
  router.get('/42', passport.authenticate('42'));
  router.get(
    '/42/return',
    passport.authenticate('42', { successRedirect: '/user/insert', failureRedirect: '/login' })
  );
  return router;
}
