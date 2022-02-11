export default function errorHandler() {
  return (err, req, res, next) => {
    const status = err.status || 500;
    const stack = process.env.NODE_ENV !== 'production' ? err?.stack : '';
    const img = status < 500 ? '4xx.jpg' : '5xx.jpg';
    let message;
    switch (status) {
      case 404:
        message = '페이지가 없어요...';
        break;
      case 500:
        message = '서버가 터졌어요...';
        break;
      default:
        message = err.message || '페이지에 문제가 생겼어요...';
        break;
    }

    // 에러 페이지 렌더
    res.status(status).render('error', { layout: false, status, stack, message, img });
  };
}
