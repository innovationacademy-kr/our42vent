import jwt from 'jsonwebtoken';
import consoleLogger from '../lib/consoleLogger.js';
import { deleteToken } from '../models/accessTokenTable.js';

export default async function logoutController(req, res) {
  try {
    res.clearCookie('accessToken');

    const decoded = jwt.decode(req.cookies.refreshToken);
    const { id } = decoded;
    deleteToken(id);
    res.clearCookie('refreshToken');
    consoleLogger.info(`logoutController : ${id} : 로그아웃 성공!`);
  } catch (err) {
    consoleLogger.error('logoutController : ', err);
  }
  res.redirect('/login');
}
