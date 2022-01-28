import redisClient from '../../config/createRedisClient.js';
import consoleLogger from '../consoleLogger.js';

// redis 에서 해당 연월 공휴일 데이터 조회 & GET
export default async function getHolidayCache(cacheKey) {
  try {
    if (await redisClient.exists(cacheKey)) {
      const holidays = await redisClient.get(cacheKey);
      if (!holidays)
        consoleLogger.warn(`cacheMonthData : ${cacheKey} exists, but somehow cannot get value`);
      consoleLogger.info(`cacheMonthData : cached ${cacheKey} has been obtained`);
      return holidays;
    }
    consoleLogger.warn(`cacheMonthData : ${cacheKey} does not exist`);
    return [];
  } catch (err) {
    throw new Error(err.message);
  }
}
