import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import createError from 'http-errors';
import logger from 'morgan';
import passport from 'passport';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import initializePassport from './controllers/initializePassport.js';
import { verifyUser } from './middlewares/verifyUser.js';
import calendarRoute from './routes/calendar.js';
import eventRoute from './routes/event.js';
import indexRoute from './routes/index.js';
import loginRoute from './routes/login.js';
import logoutRoute from './routes/logout.js';

// dotenv 로드
dotenv.config();

// 앱 전역 변수 설정
const __dirname = dirname(fileURLToPath(import.meta.url)); // 현재 디렉토리 주소 __dirname 에 저장

// passport-42 초기 설정
initializePassport(passport);

// express 세팅
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: '!Seoul' }));
app.use(express.static(join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(/^\/(?!login|logout).*$/, verifyUser);

// ejs 로 view engine 설정
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/desktopLayout');

// router 연결
app.use('/', indexRoute(express));
app.use('/login', loginRoute(express, passport));
app.use('/logout', logoutRoute(express));
app.use('/event', eventRoute(express));
app.use('/calendar', calendarRoute(express));

// 404 발생 시 에러 핸들러로
app.use((req, res, next) => next(createError(404)));

// 에러 핸들러
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러 페이지 렌더
  res.status(err.status || 500).render('error', { layout: false });
});

export default app;
