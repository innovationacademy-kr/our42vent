import monthController from '../controllers/monthController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

export default function calendarRoute(express) {
  const router = express.Router();

  router.get('/month/:year/:month', monthController);
  return router;
}