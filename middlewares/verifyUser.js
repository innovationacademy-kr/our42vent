import consoleLogger from '../lib/consoleLogger.js';
import { accessSign, accessVerify, refreshVerify } from '../lib/jwtUtils.js';

export async function verifyUser(req, res, next) {
  try {
    const accessResult = accessVerify(req.cookies.accessToken);

    if (accessResult.verified === true) {
      res.locals.userId = accessResult.id;
      next();
    } else {
      const refreshResult = await refreshVerify(req.cookies.refreshToken);

      res.locals.userId = refreshResult.id;
      if (refreshResult.verified === true) {
        const accessToken = accessSign(refreshResult.id);
        consoleLogger.info(`accessToken reissued ${accessToken}`);
        res.cookie('accessToken', accessToken, {
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
    consoleLogger.error(err);
    res.status(401).json({ error: 'Unexpected Error in verifyUser' });
  }
}

export async function verifyLoginUser(req, res, next) {
  try {
    const accessResult = accessVerify(req.cookies.accessToken);

    if (accessResult.verified === true) {
      res.locals.userId = accessResult.id;
      res.redirect('/');
    } else {
      const refreshResult = await refreshVerify(req.cookies.refreshToken);

      res.locals.userId = refreshResult.id;
      if (refreshResult.verified === true) {
        const accessToken = accessSign(refreshResult.id);
        consoleLogger.info(`accessToken reissued ${accessToken}`);
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60),
          sameSite: 'lax',
        });
        res.redirect('/');
      } else {
        next();
      }
    }
  } catch (err) {
    consoleLogger.error(err);
    res.status(401).json({ error: 'Unexpected Error in verifyUser' });
  }
}
