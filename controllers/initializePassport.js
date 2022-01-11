import { Strategy as FortyTwoStrategy } from 'passport-42';
import consoleLogger from '../lib/consoleLogger.js';

const profileToUser = async (token, rt, profile) => {
  const user = {
    id: profile.id,
    username: profile.username,
    profileImage: profile.photos[0].value,
  };
  return user;
};

export default function initializePassport(passport) {
  passport.use(
    new FortyTwoStrategy(
      {
        clientID: process.env.FORTYTWO_APP_ID,
        clientSecret: process.env.FORTYTWO_APP_SECRET,
        callbackURL: 'http://localhost:3000/login/42/return',
      },
      (accessToken, refreshToken, profile, cb) =>
        profileToUser(accessToken, refreshToken, profile).then(user => {
          consoleLogger.info(user);
          cb(null, user);
        })
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
}
