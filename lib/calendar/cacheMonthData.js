import redisClient from '../../config/createRedisClient.js';
import consoleLogger from '../consoleLogger.js';
import getHolidays from './holidaysUtils.js';

// cache 있으면 데이터 get & parsing 하고 return , 없으면 caching
export default async function cacheMonthData(cacheKey, year, month, dates) {
  // cache 존재
  if (await redisClient.exists(cacheKey)) {
    const holidays = await redisClient.get(cacheKey);
    if (!holidays) throw new Error('cacheMonthData : no value for existing cache key');
    consoleLogger.info(`cacheMonthData : cached ${cacheKey} has been obtained`);
    return holidays;
  }

  // cache 없을 때 holidays 요청 & 30분 동안 캐싱
  const holidays = await getHolidays(dates, year, month);
  const cacheResult = await redisClient.setEx(cacheKey, 1800, JSON.stringify(holidays));
  if (cacheResult.localeCompare('OK'))
    throw new Error(`cacheMonthData : failed to set cache for m_${year}{month}`);
  consoleLogger.info(`cacheMonthData : ${cacheKey} is successfully cached`);
  return holidays;
}
