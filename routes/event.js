import formidable from 'express-formidable';
import insertEventController from '../controllers/insertEventController.js';

export default function eventRouter(express) {
  const router = express.Router();

  router.post('/new', formidable(), insertEventController);
  return router;
}
