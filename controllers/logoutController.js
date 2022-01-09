async function logoutController(req, res, next) {
  res.clearCookie('accessToken');
  res.redirect('/login');
}

export default logoutController;
