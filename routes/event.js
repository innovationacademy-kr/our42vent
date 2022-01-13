import insertEventController from '../controllers/insertEventController.js';
import verifyUser from '../middlewares/userVerify.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/new', verifyUser, insertEventController);
  return router;
}
