import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = 'logs';
const { printf, colorize } = format;
const colorizer = colorize();

//  console에 찍는 log format
const logFormat = printf(msg => {
  // 라인 전체에 로그 레벨을 기반으로 색깔을 입혀줌
  const timeString = new Date().toTimeString().split(' ')[0];

  return colorizer.colorize(msg.level, `${timeString} ${msg.level.toUpperCase()}: ${msg.message}`);
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'http',
      format: logFormat,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/info/%DATE%.log`,
      format: format.json(),
      level: 'info',
      maxFiles: 30,
      zippedArchive: true,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/warn/%DATE%.log`,
      format: format.json(),
      level: 'warning',
      maxFiles: 30,
      zippedArchive: true,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/error/%DATE%.log`,
      format: format.json(),
      level: 'error',
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],

  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: `${logDir}/exceptions.log` }),
  ],
});

logger.info('info');
logger.warn('warn');
logger.error('error');
logger.http('http');

const httpErrorStream = {
  write: message => {
    logger.error(message);
  },
};

export { logger, httpErrorStream };
