import loginController from '../controllers/loginController.js';

export default function userRoute(express) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/insert', (res, req) => loginController(res, req));
  return router;
}
