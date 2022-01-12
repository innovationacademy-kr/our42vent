import loginController from '../controllers/loginController.js';
import { verifyLoginUser } from '../middlewares/verifyUser.js';

export default function loginRoute(express, passport) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/', verifyLoginUser, (req, res) => {
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
