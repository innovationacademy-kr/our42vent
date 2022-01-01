import express from 'express';

const router = express.Router();

// GET 홈페이지
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

export default router;
