import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import helmet from 'helmet';
import createError from 'http-errors';
import morgan from 'morgan';
import passport from 'passport';
import { dirname, join } from 'path';
import Sentry from '@sentry/node';
import Tracing from '@sentry/tracing';
import { fileURLToPath } from 'url';
import { httpErrorStream } from './config/winston.js';
import initializePassport from './controllers/initializePassport.js';
import { verifyUser } from './middlewares/verifyUser.js';
import calendarRoute from './routes/calendar.js';
import errorRoute from './routes/error.js';
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

Sentry.init({
  dsn: process.env.SENTRY_DSM,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        connectSrc: ["'self'", 'https://*.sentry.io/api/'],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net/', 'https://browser.sentry-cdn.com/'],
        imgSrc: ["'self'", 'https://cdn.intra.42.fr/'],
        frameSrc: ["'self'", 'https://browser.sentry-cdn.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// TODO : 400 미만의 모든 요청에 대한 로그가 필요한지 고민해봐야함
app.use(morgan('dev', { skip: (req, res) => res.statusCode >= 400 }));
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400, stream: httpErrorStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
app.use('/error', errorRoute(express));

// 404 발생 시 에러 핸들러로
app.use((req, res, next) => next(createError(404)));

// 에러 핸들러
app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const status = err.status || 500;
  const stack = err.stack || '';
  const img = status < 500 ? '4xx.jpg' : '5xx.jpg';
  let message;
  switch (status) {
    case 404:
      message = '페이지가 없어요...';
      break;
    case 500:
      message = '서버가 터졌어요...';
      break;
    default:
      message = err.message || '페이지에 문제가 생겼어요...';
      break;
  }
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러 페이지 렌더
  res.status(status).render('error', { layout: false, status, stack, message, img });
});

export default app;
