import insertNewUser from '../models/insertNewUser.js';
import consoleLogger from '../lib/consoleLogger.js';
import { accessSign, refreshSign } from '../lib/jwtUtils.js';
import insertNewToken from '../models/insertNewToken.js';

function loginController(req, res) {
  const { user } = req;

  // 사용자 db 등록 여부 확인
  try {
    insertNewUser(user, () => {
      const accessToken = accessSign(user.id);
      const refreshToken = refreshSign(user.id);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        sameSite: 'lax',
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        sameSite: 'lax',
      });

      insertNewToken(user.id, refreshToken);
      res.redirect('/');
    });
  } catch (err) {
    consoleLogger.error(err);
    res.status(500).redirect('/login');
  }
}

export default loginController;
