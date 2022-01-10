import consoleLogger from '../controllers/consoleLogger.js';
import { accessVerify } from '../lib/jwtUtils.js';

async function verifyUser(req, res, next) {
  try {
    const accessResult = accessVerify(req.cookies.accessToken);

    console.log('!!!verifyUser!!!!');
    console.log(accessResult);
    console.log(req.cookies);
    if (accessResult.verified === true) {
      console.log('accheck');
      consoleLogger.info(accessResult);
      res.locals.userId = accessResult.id;
      next();
    } else {
      // refresh token check
      console.log('else');
      const { refreshToken } = req.cookies;
      console.log('refresh check');
      console.log(refreshToken);
      if (!refreshToken) res.redirect('/login');
    }
  } catch (err) {
    res.status(401).json({ error: 'token expired' });
  }
}

export default verifyUser;
