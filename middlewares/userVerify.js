import consoleLogger from '../controllers/consoleLogger.js';
import { accessVerity } from '../jwt/jwt_utils.js';

const verifyUser = async (req, res, next) => {
  try {
    const result = accessVerity(req.cookies.accessToken);

    if (result.ok === true) {
      console.log(result);
      res.locals.userId = result.id;
      next();
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.status(401).json({ error: 'token expired' });
  }
};

export default verifyUser;
