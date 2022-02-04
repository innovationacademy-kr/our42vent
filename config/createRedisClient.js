import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from 'redis';
import { logger } from './winston.js';

const path = dirname(fileURLToPath(import.meta.url)).replace('config', '.env');
dotenv.config({ path });

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
client.connect();
client.on('ready', () => logger.info('createRedisClient : Redis is Ready'));
client.on('error', err => logger.error(`createRedisClient : Redis Client Error${err.stack}`));

export default client;
