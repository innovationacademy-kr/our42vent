import logoutController from '../controllers/logoutController.js';

export default function logoutRoute(express) {
  const router = express.Router();

  // GET 로그인 페이지
  router.get('/', logoutController);
  return router;
}
