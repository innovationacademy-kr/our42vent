import redisClient from '../../config/createRedisClient.js';
import getHolidays from './holidaysUtils.js';
import localizeDateTime from '../../lib/calendar/dateTimeUtils.js';
import { getMonthDates } from '../../lib/calendar/monthUtils.js';
import consoleLogger from '../../lib/consoleLogger.js';

// Promise.all 에 사용할 +-1년 연월 array 생성
function getParamsArray(curYear, curMonth) {
  const paramsArray = [];

  for (let i = 0; i < 24; i += 1) {
    const datesParams = new Date(curYear, curMonth - 11 + i, 1, 9);
    const [year, month] = [datesParams.getFullYear(), datesParams.getMonth()];
    const { dates } = getMonthDates(year, month);
    if (redisClient.exists(`m_${year}${month}`)) paramsArray.push({ year, month, dates });
  }
  return paramsArray;
}

// Promise.allSettled 리턴 값으로 연월별 성공/실패 여부 출력
function logResult(paramsArray, holidaysArray) {
  holidaysArray.forEach((result, index) => {
    const { status, value } = result;
    const { year, month } = paramsArray[index];
    const cacheKey = `m_${year}${month}`;

    if (status === 'fulfilled') {
      if (value.result === 'OK') {
        consoleLogger.info(`initHolidaysCache : ${cacheKey} SUCCESS`);
      } else {
        consoleLogger.info(`initHolidaysCache : ${cacheKey} EXISTS`);
      }
    } else {
      consoleLogger.error(`initHolidaysCache : ${cacheKey} FAIL, ${result.reason}`);
    }
  });
}

// 현재 월로부터 +- 1년 공휴일 데이터 axios GET & redis caching
async function initHolidaysCache() {
  const today = localizeDateTime(new Date());
  const paramsArray = getParamsArray(today.getFullYear(), today.getMonth());

  try {
    const holidaysArray = await Promise.allSettled(
      paramsArray.map(async params => {
        const { year, month, dates } = params;
        const cacheKey = `m_${year}${month}`;
        let result = 'EXISTS';

        if (!(await redisClient.exists(`${cacheKey}`))) {
          const holidays = await getHolidays(dates, year, month);

          const expire = Math.ceil((new Date(year, month + 12, 1, 9) - today) / 1000);
          result = await redisClient.setEx(`m_${year}${month}`, expire, JSON.stringify(holidays));
          if (result.localeCompare('OK')) throw new Error(`failed caching ${cacheKey}`);
        }
        return { cacheKey, result };
      })
    );
    logResult(paramsArray, holidaysArray);
  } catch (err) {
    consoleLogger.error(`initHolidaysCache : ${err.stack}`);
  } finally {
    redisClient.quit();
    consoleLogger.info('initHolidaysCache : redis connection is quitted');
  }
}

initHolidaysCache();
