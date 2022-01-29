import formidable from 'express-formidable';
import {
  eventDataController,
  eventDeleteController,
  eventEditController,
  eventListController,
  eventDetailController,
} from '../controllers/eventListController.js';
import insertEventController from '../controllers/insertEventController.js';
import {
  subscribeEventController,
  unsubscribeController,
} from '../controllers/myEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  // new event 생성
  router.post('/', formidable(), insertEventController);
  router.get('/list', eventListController);
  router.get('/list/data', eventDataController);
  router.delete('/:eventId', eventDeleteController);

  // 해당 id 이벤트 정보 불러오기
  router.get('/:eventId', eventDetailController);
  router.put('/:eventId', formidable(), eventEditController);

  // 내 이벤트(My event)로 등록하기
  router.post('/myevent/:eventId', subscribeEventController);
  router.delete('/myevent/:eventId', unsubscribeController);
  return router;
}
