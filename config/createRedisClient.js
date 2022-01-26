import dotenv from 'dotenv';
import { createClient } from 'redis';
import consoleLogger from '../lib/consoleLogger.js';

dotenv.config({ path: '/Users/danielgyoungminhan/dev/our42vent/.env' });

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
client.connect();
client.on('ready', () => consoleLogger.info('createRedisClient : Redis is Ready'));
client.on('error', err => consoleLogger.error('createRedisClient : Redis Client Error', err));
export default client;
