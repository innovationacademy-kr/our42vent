import monthController from '../controllers/monthController.js';

export default function calendarRoute(express) {
  const router = express.Router();

  // 모든 이벤트 뷰 데이터 GET
  router.get('/month/:year(\\d{4})/:month([0-9]|1[0-1])', monthController);

  // 내가 등록한 이벤트 뷰 데이터 GET
  router.get('/myEvent/month/:year(\\d{4})/:month([0-9]|1[0-1])', monthController);
  return router;
}
