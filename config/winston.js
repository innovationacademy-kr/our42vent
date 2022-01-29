import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';

const logDir = 'logs';
const { printf, colorize } = winston.format;

const now = moment();
const colorizer = colorize();

const logFormat = printf(msg =>
  colorizer.colorize(
    msg.level,
    `${now.format('HH:mm:ss')} ${msg.level.toUpperCase()}: ${msg.message}`
  )
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: logFormat,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/http/%DATE%.log`,
      format: winston.format.json(),
      level: 'http',
      maxFiles: 30,
      zippedArchive: true,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/info/%DATE%.log`,
      format: winston.format.json(),
      level: 'info',
      maxFiles: 30,
      zippedArchive: true,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/warn/%DATE%.log`,
      format: winston.format.json(),
      level: 'warning',
      maxFiles: 30,
      zippedArchive: true,
    }),

    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${logDir}/error/%DATE%.log`,
      format: winston.format.json(),
      level: 'error',
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],

  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${logDir}/exceptions.log` }),
  ],
});

logger.info('info');
logger.warn('warn');
logger.error('error');
logger.http('http');

const httpLogStream = {
  write: message => {
    logger.http(message);
  },
};

const httpErrorStream = {
  write: message => {
    logger.error(message);
  },
};

export { logger, httpLogStream, httpErrorStream };
