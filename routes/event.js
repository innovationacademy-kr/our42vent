import formidable from 'express-formidable';
import {
  eventCreatorController,
  eventDeleteController,
  eventEditController,
  eventListController,
  eventPreviewEditController,
} from '../controllers/eventListController.js';
import insertEventController from '../controllers/insertEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/new', formidable(), insertEventController);
  router.get('/list', eventListController);
  router.get('/list/creator', eventCreatorController);
  router.delete('/list/delete', eventDeleteController);
  router.get('/list/edit/:eventId', eventPreviewEditController);
  router.put('/list/edit/:eventId', formidable(), eventEditController);
  return router;
}
