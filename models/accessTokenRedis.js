import redisClient from '../config/createRedisClient.js';
import consoleLogger from '../lib/consoleLogger.js';

export async function insertToken(id, token) {
  try {
    const ret = await redisClient.setEx(`r_${id}`, 1.2096e6, token); // 2주 뒤 만료
    if (ret.localeCompare('OK')) throw new Error(`Fail to insert Token for ${id}`);
    consoleLogger.info(`insertToken : cache success : refreshToken has been issued for ${id}`);
  } catch (err) {
    consoleLogger.error('insertToken : cache error : ', err.stack);
  }
}

export async function deleteToken(id) {
  try {
    const ret = await redisClient.del(`r_${id}`);
    if (ret !== 1) throw new Error(`Failed to delete Token for ${id}`);
    consoleLogger.info(`deleteToken : cache success : refreshToken has been deleted for ${id}`);
  } catch (err) {
    consoleLogger.error('deleteToken : cache error : ', err.stack);
  }
}

export async function selectToken(id) {
  try {
    const ret = await redisClient.get(`r_${id}`);
    if (ret === null) throw new Error(`Fail to select Token for ${id}`);
    consoleLogger.info(`selectToken : cache success : refreshToken for ${id} is ${ret}`);
    return ret;
  } catch (err) {
    consoleLogger.error('selectToken : cache error : ', err.stack);
    return null;
  }
}
