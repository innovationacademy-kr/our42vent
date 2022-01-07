import { Strategy as FortyTwoStrategy } from 'passport-42';
import consoleLogger from './consoleLogger.js';

export default function initializePassport(passport) {
  passport.use(
    new FortyTwoStrategy(
      {
        clientID: process.env.FORTYTWO_APP_ID,
        clientSecret: process.env.FORTYTWO_APP_SECRET,
        callbackURL: 'http://localhost:3000/login/42/return',
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, cb) => {
        req.session.accessToken = accessToken;
        consoleLogger.info('accessToken', accessToken, 'refreshToken', refreshToken);
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, {
      id: Number(user.id),
      username: user.username,
      profileImage: user.photos[0].value,
      registeredUser: false,
    });
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
}
