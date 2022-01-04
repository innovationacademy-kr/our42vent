import express from 'express';

const router = express.Router();

// GET 홈페이지
router.get('/', (req, res) => {
  res.status(200).render('index', {
    layout: 'layouts/desktopLayout',
    title: '우리42벤트 | ALL EVENTS',
    username: req.user.username,
    profileImage: req.user.profileImage,
  });
});

export default router;
