import {
  subscribePushController,
  unsubscribePushController,
} from '../controllers/pushController.js';

export default function pushRoute(express) {
  const router = express.Router();

  router.post('/', subscribePushController);
  router.delete('/', unsubscribePushController);
  return router;
}
