import redisClient from '../config/createRedisClient.js';
import { logger } from '../config/winston.js';

export async function insertToken(id, token) {
  const ret = await redisClient.setEx(
    `${process.env.NODE_ENV === 'development' ? 'dev_' : ''}r_${id}`,
    1.2096e6,
    token
  ); // 2주 뒤 만료
  if (ret.localeCompare('OK')) throw new Error(`Failed to insert Token for ${id}`);
  logger.info(`insertToken : cache success : refreshToken has been issued for ${id}`);
}

export async function deleteToken(id) {
  const ret = await redisClient.del(
    `${process.env.NODE_ENV === 'development' ? 'dev_' : ''}r_${id}`
  );
  if (ret !== 1) throw new Error(`Failed to delete Token for ${id}`);
  logger.info(`deleteToken : cache success : refreshToken has been deleted for ${id}`);
}

export async function selectToken(id) {
  const ret = await redisClient.get(
    `${process.env.NODE_ENV === 'development' ? 'dev_' : ''}r_${id}`
  );
  logger.info(`selectToken : cache success : refreshToken for ${id} is ${ret}`);
  return ret;
}
