import indexController from '../controllers/indexController.js';

export default function indexRouter(express) {
  const router = express.Router();

  // GET 홈페이지
  router.get('/', indexController);
  return router;
}
