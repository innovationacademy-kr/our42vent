import monthController from '../controllers/monthController.js';

export default function calendarRoute(express) {
  const router = express.Router();

  // 모든 이벤트 뷰 데이터 GET
  router.get('/month/:year/:month', monthController);

  // 내가 등록한 이벤트 뷰 데이터 GET
  router.get('/myEvent/month/:year/:month', monthController);
  return router;
}
