import consoleLogger from '../controllers/consoleLogger.js';
import { accessVerity } from '../jwt/jwt_utils.js';

async function verifyUser(req, res, next) {
  try {
    const result = accessVerity(req.cookies.accessToken);

    if (result.verified === true) {
      // consoleLogger.info(result);
      res.locals.userId = result.id;
      next();
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.status(401).json({ error: 'token expired' });
  }
}

export default verifyUser;
