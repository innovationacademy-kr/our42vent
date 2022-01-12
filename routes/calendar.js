import calendarMonthController from '../controllers/calendarMonthController.js';

export default function calendarRoute(express) {
  const router = express.Router();

  router.get('/month/:year/:month', calendarMonthController);
  return router;
}
