import { Strategy as FortyTwoStrategy } from 'passport-42';
import consoleLogger from '../lib/consoleLogger.js';

// 42-api의 사용자 profile에서 필요한 사용자 정보 추출
async function profileToUser(token, rt, profile) {
  const user = {
    id: profile.id,
    username: profile.username,
    profileImage: profile.photos[0].value,
  };
  return user;
}

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
          consoleLogger.info('profileToUser : ', user);
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
