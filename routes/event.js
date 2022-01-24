import formidable from 'express-formidable';
import insertEventController from '../controllers/insertEventController.js';
import selectEventController from '../controllers/selectEventController.js';
import insertMyEventController from '../controllers/insertMyEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  // new event 생성
  router.post('/new', formidable(), insertEventController);

  // 내 이벤트(My event)로 등록하기
  router.post('/myevent', insertMyEventController);

  // 해당 id 이벤트 정보 불러오기
  router.get('/:id', selectEventController);
  return router;
}
