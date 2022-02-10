import jwt from 'jsonwebtoken';
import { logger } from '../config/winston.js';
import { deleteToken } from '../models/accessTokenRedis.js';

export default async function logoutController(req, res) {
  try {
    res.clearCookie('accessToken');

    const decoded = jwt.decode(req.cookies.refreshToken);
    res.clearCookie('refreshToken');
    const id = decoded?.id;
    if (id) await deleteToken(id);
    res.status(200);
    logger.info(`logoutController : ${id} : 로그아웃 성공!`);
  } catch (err) {
    logger.warn(err.stack);
  } finally {
    res.redirect('/login');
  }
}
