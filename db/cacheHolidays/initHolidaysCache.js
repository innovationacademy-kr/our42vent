import redisClient from '../../config/createRedisClient.js';
import localizeDateTime from '../../lib/calendar/dateTimeUtils.js';
import getHolidays from '../../lib/calendar/holidaysUtils.js';
import { getMonthDates } from '../../lib/calendar/monthUtils.js';
import consoleLogger from '../../lib/consoleLogger.js';

// Promise.all 에 사용할 +-1년 연월 array 생성
function getParamsArray(curYear, curMonth) {
  const paramsArray = [];

  for (let i = 0; i < 24; i += 1) {
    const datesParams = new Date(curYear, curMonth - 11 + i, 1, 9);
    const [year, month] = [datesParams.getFullYear(), datesParams.getMonth()];
    const { dates } = getMonthDates(year, month);
    paramsArray.push({ year, month, dates });
  }
  return paramsArray;
}

// 현재 월로부터 +- 1년 공휴일 데이터 redis 에 caching
async function initHolidaysCache() {
  const today = localizeDateTime(new Date());
  const paramsArray = getParamsArray(today.getFullYear(), today.getMonth());

  try {
    // 현재 월로부터 +- 1년 공휴일 데이터 axios GET
    const holidaysArray = await Promise.all(
      paramsArray.map(async params => {
        const { year, month, dates } = params;
        const holidays = await getHolidays(dates, year, month);
        return holidays;
      })
    );
    consoleLogger.info(`initHolidaysCache : data is successfully fetched`);

    // redis 에 caching
    await Promise.all(
      holidaysArray.map(async (holidays, index) => {
        const { year, month } = paramsArray[index];
        const expire = Math.ceil((new Date(year, month + 12, 1, 9) - today) / 1000);

        const result = await redisClient.setEx(
          `m_${year}${month}`,
          expire,
          JSON.stringify(holidays)
        );

        if (result.localeCompare('OK')) throw new Error(`failed caching m_${year}${month}`);
        return result;
      })
    );
    consoleLogger.info(`initHolidaysCache : data is cached successfully`);
  } catch (err) {
    consoleLogger.error(`initHolidaysCache : ${err.stack}`);
  } finally {
    redisClient.quit();
    consoleLogger.info('initHolidaysCache : redis connection is quitted');
  }
}

initHolidaysCache();
