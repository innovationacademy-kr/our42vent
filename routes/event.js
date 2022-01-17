import formidable from 'express-formidable';
import insertEventController from '../controllers/insertEventController.js';
import eventListController from '../controllers/eventListController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/new', formidable(), insertEventController);
  router.get('/list', verifyUser, eventListController);
  return router;
}
