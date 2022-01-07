import express from 'express';
import consoleLogger from '../controllers/consoleLogger.js';

const router = express.Router();

router.post('/', (req, res) => {
  consoleLogger.info(req.body);
  res.redirect('/');
});

export default router;
