import { Strategy as FortyTwoStrategy } from 'passport-42';
import { logger } from '../config/winston.js';
import { insertUser } from '../models/accessUserTable.js';

// 42-api의 사용자 profile에서 필요한 사용자 정보 추출
function profileToUser(profile) {
  const user = {
    id: profile.id,
    username: profile.username,
    profileImage: profile.photos[0].value,
  };
  logger.info(`profileToUser : ${JSON.stringify(user)}`);
  return user;
}

export default function initializePassport(passport) {
  passport.use(
    new FortyTwoStrategy(
      {
        clientID: process.env.FORTYTWO_APP_ID,
        clientSecret: process.env.FORTYTWO_APP_SECRET,
        callbackURL: process.env.RETURN_URL,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          if (!profile) throw new Error('fail to load profile');
          const user = profileToUser(profile);
          await insertUser(user);
          cb(null, user);
        } catch (err) {
          logger.warn(`FortyTwoStrategy : ${err.stack}`);
          cb(err);
        }
      }
    )
  );
}
