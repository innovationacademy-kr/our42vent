import consoleLogger from '../lib/consoleLogger.js';
import { accessSign, refreshSign } from '../lib/jwtUtils.js';
import { insertToken } from '../models/accessTokenTable.js';
import { insertUser } from '../models/accessUserTable.js';

export default function loginController(req, res) {
  const { user } = req;

  // 사용자 db 등록 여부 확인
  try {
    insertUser(user, () => {
      const accessToken = accessSign(user.id);
      const refreshToken = refreshSign(user.id);

      res.cookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
        sameSite: 'lax',
      });

      res.cookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1.2096e9), // 2주 뒤 만료
        sameSite: 'lax',
      });

      consoleLogger.info(`loginController : ${user.id} : 로그인 성공!`);
      insertToken(user.id, refreshToken);
      res.redirect('/');
    });
  } catch (err) {
    consoleLogger.error('loginController : ', err);
    res.status(500).redirect('/login');
  }
}
