import { logger } from '../config/winston.js';
import { accessSign, verifyAccess, verifyRefresh } from '../lib/jwtUtils.js';

// 토큰을 검증하여 성공하면 next(), 실패하면 로그인 페이지로 redirect
export async function verifyUser(req, res, next) {
  try {
    const accessResult = verifyAccess(req.cookies.accessToken);

    if (accessResult.verified) {
      res.locals.userId = accessResult.id;
      next();
    } else {
      const refreshResult = await verifyRefresh(req.cookies.refreshToken);

      if (refreshResult.verified) {
        res.locals.userId = refreshResult.id;
        const accessToken = accessSign(refreshResult.id);

        logger.info(`verifyUser : accessToken reissued : ${accessToken}`);
        res.cookie('accessToken', accessToken, {
          secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 3.6e6), // 1시간 뒤 만료
          sameSite: 'lax',
        });
        next();
      } else {
        if ('cors'.localeCompare(req.get('Sec-Fetch-Mode'))) res.redirect('/login');
        res.status(401).end();
      }
    }
  } catch (err) {
    logger.warn(`verifyUser : ${err.stack}`);
    err.status = 401;
    next(err);
  }
}

// 로그인된 사용자가 로그인 페이지로 접근시 홈으로 redirect
export async function verifyLoginUser(req, res, next) {
  try {
    const accessResult = verifyAccess(req.cookies.accessToken);

    if (accessResult.verified) {
      res.locals.userId = accessResult.id;
      res.redirect('/');
    } else {
      const refreshResult = await verifyRefresh(req.cookies.refreshToken);

      if (refreshResult.verified) {
        res.locals.userId = refreshResult.id;
        const accessToken = accessSign(refreshResult.id);

        logger.info(`verifyLoginUser : accessToken reissued : , ${accessToken}`);
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
    logger.warn(`verifyLoginUser : ${err.stack}`);
    err.status = 401;
    next(err);
  }
}
