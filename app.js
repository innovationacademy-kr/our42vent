import express from 'express';
import createError from 'http-errors';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// ejs 로 view engine 설정
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/desktopLayout');

// router 연결
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 발생 시 에러 핸들러로
app.use((req, res, next) => {
  next(createError(404));
});

// 에러 핸들러
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러 페이지 렌더
  res.status(err.status || 500);
  res.render('error');
});

export default app;
