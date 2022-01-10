import indexController from '../controllers/indexController.js';
import verifyUser from '../middlewares/userVerify.js';

export default function indexRouter(express) {
  const router = express.Router();

  // GET 홈페이지
  router.get('/', verifyUser, indexController);
  return router;
}
