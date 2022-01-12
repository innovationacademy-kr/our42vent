import consoleLogger from '../lib/consoleLogger.js';
import { accessSign, verifyAccess, verifyRefresh } from '../lib/jwtUtils.js';

// 토큰을 검증하여 성공하면 next(), 실패하면 로그인 페이지로 redirect
export async function verifyUser(req, res, next) {
  try {
    const accessResult = verifyAccess(req.cookies.accessToken);

    if (accessResult.verified === true) {
      res.locals.userId = accessResult.id;
      next();
    } else {
      const refreshResult = await verifyRefresh(req.cookies.refreshToken);

      res.locals.userId = refreshResult.id;
      if (refreshResult.verified === true) {
        const accessToken = accessSign(refreshResult.id);

        consoleLogger.info('verifyUser : accessToken reissued : ', accessToken);
        res.cookie('accessToken', accessToken, {
          secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
          sameSite: 'lax',
        });
        next();
      } else {
        res.redirect('/login');
      }
    }
  } catch (err) {
    consoleLogger.error('verifyUser : ', err);
    res.status(401).json({ error: 'Unexpected Error in verifyUser' });
  }
}

// 로그인된 유저가 로그인 페이지로 접근시 홈으로 redirect.
export async function verifyLoginUser(req, res, next) {
  try {
    const accessResult = verifyAccess(req.cookies.accessToken);

    if (accessResult.verified === true) {
      res.locals.userId = accessResult.id;
      res.redirect('/');
    } else {
      const refreshResult = await verifyRefresh(req.cookies.refreshToken);

      res.locals.userId = refreshResult.id;
      if (refreshResult.verified === true) {
        const accessToken = accessSign(refreshResult.id);

        consoleLogger.info('verifyLoginUser : accessToken reissued : ', accessToken);
        res.cookie('accessToken', accessToken, {
          secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
          sameSite: 'lax',
        });
        res.redirect('/');
      } else {
        next();
      }
    }
  } catch (err) {
    consoleLogger.error('verifyLoginUser : ', err);
    res.status(401).json({ error: 'Unexpected Error in verifyLoginUser' });
  }
}
