import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import helmet from 'helmet';
import createError from 'http-errors';
import morgan from 'morgan';
import schedule from 'node-schedule';
import passport from 'passport';
import { dirname, join } from 'path';
import Sentry from '@sentry/node';
import Tracing from '@sentry/tracing';
import { fileURLToPath } from 'url';
import helmetConfig from './config/helmet.js';
import { httpErrorStream } from './config/winston.js';
import initializePassport from './controllers/initializePassport.js';
import triggerPush from './lib/push/triggerPush.js';
import errorHandler from './middlewares/errorHandler.js';
import { verifyUser } from './middlewares/verifyUser.js';
import calendarRoute from './routes/calendar.js';
import errorRoute from './routes/error.js';
import eventRoute from './routes/event.js';
import indexRoute from './routes/index.js';
import loginRoute from './routes/login.js';
import logoutRoute from './routes/logout.js';
import pushRoute from './routes/push.js';

// dotenv 로드
dotenv.config();

// 앱 전역 변수 설정
const __dirname = dirname(fileURLToPath(import.meta.url)); // 현재 디렉토리 주소 __dirname 에 저장

// passport-42 초기 설정
initializePassport(passport);

// express 세팅
const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSM,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// 알림 trigger 스케줄러
schedule.scheduleJob('event^notifier', '*/1 * * * *', triggerPush);

app.use(helmet(helmetConfig));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// TODO : 400 미만의 모든 요청에 대한 로그가 필요한지 고민해봐야함
app.use(morgan('dev', { skip: (req, res) => res.statusCode >= 400 }));
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400, stream: httpErrorStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(join(__dirname, 'public')));
app.use(passport.initialize());
app.use(/^\/(?!login|logout|error).*$/, verifyUser);

// ejs 로 view engine 설정
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// router 연결
app.use('/', indexRoute(express));
app.use('/login', loginRoute(express, passport));
app.use('/logout', logoutRoute(express));
app.use('/event', eventRoute(express));
app.use('/calendar', calendarRoute(express));
app.use('/push', pushRoute(express));
app.use('/error', errorRoute(express));

// 에러 핸들러
app.use(Sentry.Handlers.errorHandler());
app.use((req, res, next) => next(createError(404)));
app.use(errorHandler());

export default app;
