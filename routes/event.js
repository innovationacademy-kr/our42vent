import verifyUser from '../middlewares/userVerify.js';
import insertNewEvent from '../models/insertNewEvent.js';

export default function postEventRouter(express) {
  const router = express.Router();

  router.post('/new', verifyUser, insertNewEvent, (req, res) => res.redirect('/'));
  return router;
}
