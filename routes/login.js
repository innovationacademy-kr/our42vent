import { logger } from '../config/winston.js';
import { setTokens } from '../lib/jwtUtils.js';
import { verifyLoginUser } from '../middlewares/verifyUser.js';

export default function loginRoute(express, passport) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/', verifyLoginUser, (req, res) => {
    res.status(200).render('login', { layout: false });
  });

  // 42 OAuth 2.0
  router.get('/42', passport.authenticate('42', { session: false }));

  // return으로 redirect와 동시에 종료
  router.get('/42/return', (req, res) => {
    passport.authenticate('42', { session: false }, async (err, user) => {
      try {
        if (err || !user) throw err;

        await setTokens(res, user);
        res.redirect('/');
      } catch (err) {
        logger.warn(`passport authenticate return :  ${err.stack}`);
        res.redirect('/login');
      }
    })(req, res);
  });
  return router;
}
