import loginController from '../controllers/loginController.js';

export default function loginRoute(express, passport) {
  const router = express.Router();

  // GET 로그인 페이지 미들웨어를 만들어서 ok면 렌더 페이지 not ok이면 홈
  router.get('/', (req, res) => {
    res.status(200).render('login', { layout: false });
  });

  // 42 OAuth 2.0
  router.get('/42', passport.authenticate('42'));
  router.get(
    '/42/return',
    passport.authenticate('42', { successRedirect: '/login/token', failureRedirect: '/login' })
  );

  // access 및 refresh token 생성 controller
  router.get('/token', loginController);
  return router;
}
