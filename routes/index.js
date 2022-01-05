import express from 'express';
import indexController from '../controllers/indexController.js';

export default function indexRouter(connection) {
  const router = express.Router();

  // GET 홈페이지
  router.get('/', (req, res) => indexController(req, res, connection));
  return router;
}
