import insertNewUser from '../models/insertNewUser.js';
import consoleLogger from './consoleLogger.js';
import { accessSign } from '../lib/jwtUtils.js';

async function loginController(req, res) {
  const { user } = req;

  // 사용자 db 등록 여부 확인
  try {
    insertNewUser(user, () => {
      const accessToken = accessSign(user.id);
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
      });
      res.redirect('/');
    });
  } catch (err) {
    consoleLogger.error(err);
    res.status(500).redirect('/login');
  }
}

export default loginController;
