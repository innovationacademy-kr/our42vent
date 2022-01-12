import insertEventController from '../controllers/insertEventController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

export default function postEventRouter(express) {
  const router = express.Router();

  router.post('/new', verifyUser, insertEventController);
  return router;
}
