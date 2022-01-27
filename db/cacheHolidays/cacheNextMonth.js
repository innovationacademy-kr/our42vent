import redisClient from '../../config/createRedisClient.js';
import getHolidays from './holidaysUtils.js';
import localizeDateTime from '../../lib/calendar/dateTimeUtils.js';
import { getMonthDates } from '../../lib/calendar/monthUtils.js';
import consoleLogger from '../../lib/consoleLogger.js';

// 매월 1일 다음해 해당월 공휴일 데이터 caching
async function cacheNextMonth() {
  try {
    const today = localizeDateTime(new Date());
    const [year, month] = [today.getFullYear() + 1, today.getMonth() + 1];
    const { dates } = getMonthDates(year, month);

    const holidays = await getHolidays(dates, year, month);
    const expire = Math.ceil((new Date(year, month + 12, 1, 9) - today) / 1000);
    const cacheResult = await redisClient.setEx(
      `m_${year}${month}`,
      expire,
      JSON.stringify(holidays)
    );
    if (cacheResult.localeCompare('OK')) throw new Error(`failed caching m_${year}${month}`);
    consoleLogger.info(`cacheNextMonth : successfully cached m_${year}${month}`);
  } catch (err) {
    consoleLogger.error(err.stack);
  } finally {
    redisClient.quit();
  }
}

cacheNextMonth();
