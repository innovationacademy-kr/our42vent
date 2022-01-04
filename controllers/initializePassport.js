import { Strategy as FortyTwoStrategy } from 'passport-42';

export default function initializePassport(passport, connection) {
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
        console.log('accessToken', accessToken, 'refreshToken', refreshToken);
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, cb) =>
    cb(null, { username: user.username, profileImage: user.photos[0].value })
  );

  passport.deserializeUser((obj, cb) => {
    connection.query(
      'INSERT INTO user (name, profileImage, createdAt, updatedAt) VALUES ' +
        `("${obj.username}", "${obj.profileImage}", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`,
      (err, rows, fields) => {
        if (!err) {
          console.log(rows);
          console.log(fields);
        } else if (err.code === 'ER_DUP_ENTRY') {
          console.log(
            '=============================================\n' +
              `이미 등록돼 있는 사용자입니다!\n` +
              '============================================='
          );
        } else {
          console.log(`query error : ${err}`);
        }
      }
    );
    cb(null, obj);
  });
}
