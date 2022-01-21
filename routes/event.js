import formidable from 'express-formidable';
import insertEventController from '../controllers/insertEventController.js';
import {
  eventCreatorController,
  eventDeleteController,
  eventEditController,
  eventListController,
  eventPreviewEditController,
} from '../controllers/eventListController.js';
import { verifyUser } from '../middlewares/verifyUser.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/new', formidable(), insertEventController);
  router.get('/list', verifyUser, eventListController);
  router.get('/list/creator', verifyUser, eventCreatorController);
  router.delete('/list/delete', verifyUser, eventDeleteController);
  router.get('/list/edit/:eventId', verifyUser, eventPreviewEditController);
  router.put('/list/edit/:eventId', verifyUser, formidable(), eventEditController);
  return router;
}
