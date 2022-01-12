import jwt from 'jsonwebtoken';
import { deleteToken } from '../models/accessTokenDB.js';
import consoleLogger from '../lib/consoleLogger.js';

async function logoutController(req, res, next) {
  try {
    res.clearCookie('accessToken');

    const decoded = jwt.decode(req.cookies.refreshToken);
    const { id } = decoded;
    deleteToken(id);
    res.clearCookie('refreshToken');
    consoleLogger.info('Logged out Successfully');
  } catch (err) {
    consoleLogger.error(`logout : Error : ${err}`);
  }
  res.redirect('/login');
}

export default logoutController;
