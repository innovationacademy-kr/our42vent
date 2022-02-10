export default function errorRouter(express) {
  const router = express.Router();
  const layout = false;
  const stack = '';

  router.get('/408', (req, res) => {
    res.status(408).render('error', {
      layout,
      status: 408,
      message: '너무 오래 걸려요...',
      stack,
      img: '4xx.jpg',
    });
  });

  router.get('/404', (req, res) => {
    res.status(404).render('error', {
      layout,
      status: 404,
      message: '페이지가 없어요...',
      stack,
      img: '4xx.jpg',
    });
  });

  router.get('/500', (req, res) => {
    res.status(500).render('error', {
      layout,
      status: 500,
      message: '서버가 터졌어요...',
      stack,
      img: '4xx.jpg',
    });
  });

  return router;
}
