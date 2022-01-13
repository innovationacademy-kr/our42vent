import monthController from '../controllers/monthController.js';

export default function calendarRoute(express) {
  const router = express.Router();

  router.get('/month/:year/:month', monthController);
  return router;
}
