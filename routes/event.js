import formidable from 'express-formidable';
import {
  eventDataController,
  eventDeleteController,
  eventEditController,
  eventListController,
  eventDetailController,
  eventInfoController,
} from '../controllers/eventController.js';
import insertEventController from '../controllers/insertEventController.js';
import {
  subscribeEventController,
  unsubscribeEventController,
} from '../controllers/myEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  // new event 생성
  router.post('/', formidable(), insertEventController);
  router.get('/list', eventListController);
  router.get('/list/data', eventDataController);

  router.delete('/:eventId(\\d+)', eventDeleteController);
  router.get('/:eventId(\\d+)', eventDetailController);
  router.put('/:eventId(\\d+)', formidable(), eventEditController);

  router.get('/info/:eventId(\\d+)', eventInfoController);

  // 내 이벤트(My event)로 등록하기
  router.post('/myevent/:eventId(\\d+)', subscribeEventController);
  router.delete('/myevent/:eventId(\\d+)', unsubscribeEventController);
  return router;
}
