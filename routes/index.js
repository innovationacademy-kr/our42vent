import express from 'express';

const router = express.Router();

// GET 홈페이지
router.get('/', (req, res, next) => {
  res.render('index', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | ALL EVENTS',
  });
});

export default router;
