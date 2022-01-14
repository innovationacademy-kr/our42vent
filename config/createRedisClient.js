import redis from 'redis';
import dotenv from 'dotenv';
import consoleLogger from '../lib/consoleLogger.js';

dotenv.config();

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
client.connect();
client.on('ready', () => consoleLogger.info('createRedisClient : Redis is Ready'));
client.on('error', err => consoleLogger.error('createRedisClient : Redis Client Error', err));
export default client;
