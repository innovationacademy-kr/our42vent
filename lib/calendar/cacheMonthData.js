import redisClient from '../../config/createRedisClient.js';
import consoleLogger from '../consoleLogger.js';
import localizeDateTime from './dateTimeUtils.js';
import getHolidays from './holidaysUtils.js';
import { checkYearMonthRange, getMonthDates } from './monthUtils.js';

// cache expiration 설정
function setMonthCacheExpiration(cacheKey, year, month) {
  const now = localizeDateTime(new Date());
  const [thisYear, thisMonth] = [now.getFullYear(), now.getMonth()];
  const threeMonthsAgo = new Date(thisYear, thisMonth - 3, 1, 9);
  const threeMonthsLater = new Date(thisYear, thisMonth + 3, 1, 9);
  const reqMonth = new Date(year, month, 1, 9);

  if (reqMonth >= threeMonthsAgo && reqMonth < threeMonthsLater) {
    const sixMonthsLater = new Date(year, month + 6, 1, 9);
    const expiration =
      sixMonthsLater.getFullYear() > thisYear
        ? new Date(thisYear + 1, 0, 1, 9) - now
        : sixMonthsLater - now;
    redisClient.expire(cacheKey, Math.floor(expiration / 1000));
  } else {
    redisClient.expire(cacheKey, 1800);
  }
}

// cache 있으면 데이터 get & parsing 하고 return , 없으면 caching
export default async function cacheMonthData(cacheKey, yearParam, monthParam) {
  try {
    // cache 존재
    if (await redisClient.exists(cacheKey)) {
      const monthData = await redisClient.hGetAll(cacheKey);

      // string value 를 array 로 파싱
      monthData.dates = JSON.parse(monthData.dates).map(day => new Date(day));
      monthData.holidays = JSON.parse(monthData.holidays);
      consoleLogger.info(`cacheMonthData : cached ${cacheKey} has been obtained`);
      return monthData;
    }

    // cache 없을 때 다시 data 가공 후 hSet & expiration 설정
    const { year, month } = checkYearMonthRange(yearParam, monthParam);
    const { noWeeks, dates } = getMonthDates(year, month);
    const holidays = await getHolidays(dates, year, month);
    const [firstSQLDate, lastSQLDate] = [dates[0].toISOString(), dates.at(-1).toISOString()];

    await redisClient.hSet(cacheKey, 'year', year);
    await redisClient.hSet(cacheKey, 'month', month);
    await redisClient.hSet(cacheKey, 'noWeeks', noWeeks);
    await redisClient.hSet(cacheKey, 'dates', JSON.stringify(dates));
    await redisClient.hSet(cacheKey, 'firstSQLDate', firstSQLDate);
    await redisClient.hSet(cacheKey, 'lastSQLDate', lastSQLDate);
    await redisClient.hSet(cacheKey, 'holidays', JSON.stringify(holidays));
    setMonthCacheExpiration(cacheKey, year, month);
    consoleLogger.info(`cacheMonthData : ${cacheKey} is successfully cached`);

    return {
      dates,
      firstSQLDate,
      holidays,
      lastSQLDate,
      month,
      noWeeks,
      year,
    };
  } catch (err) {
    consoleLogger.error('cacheMonthData : cache error : ', err);
    return err;
  }
}
