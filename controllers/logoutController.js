import jwt from 'jsonwebtoken';
import deleteToken from '../models/deleteToken.js';
import consoleLogger from '../lib/consoleLogger.js';

async function logoutController(req, res, next) {
  try {
    const { accessToken } = req.cookies;
    res.clearCookie('accessToken');
    const userId = jwt.decode(req.cookies.refreshToken).id;
    deleteToken(userId);
    res.clearCookie('refreshToken');
    consoleLogger.info('Logged out Successfully');
  } catch (err) {
    consoleLogger.error(`logout : Error : ${err}`);
  }
  res.redirect('/login');
}

export default logoutController;
