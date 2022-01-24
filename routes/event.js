import formidable from 'express-formidable';
import {
  eventDataController,
  eventDeleteController,
  eventEditController,
  eventListController,
  eventPreviewEditController,
} from '../controllers/eventListController.js';
import insertEventController from '../controllers/insertEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/', formidable(), insertEventController);
  router.get('/list', eventListController);
  router.get('/list/data', eventDataController);
  router.delete('/:eventId', eventDeleteController);
  router.get('/:eventId', eventPreviewEditController);
  router.put('/:eventId', formidable(), eventEditController);
  return router;
}
