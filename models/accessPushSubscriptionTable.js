import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

export async function replacePushSubscription(userId, subscription) {
  const sql = 'REPLACE INTO push_subscription VALUES (?, ?);';

  const [rows] = await pool.execute(sql, [subscription, userId]);
  logger.info(`replacePushSubscription : query success : ${JSON.stringify(rows)}`);
}

export async function deletePushSubscription(subscription) {
  const sql = 'DELETE FROM push_subscription WHERE sub=?';

  const [deleted] = await pool.execute(sql, [subscription]);
  logger.info(
    `deletePushSubscription : query success : deleted push_subscription entry ` +
      `sub=${subscription}`
  );
  return deleted;
}

export async function selectPushSubscription(subscription) {
  const sql = 'SELECT sub, userId FROM push_subscription WHERE sub=?';
  const [[rows]] = await pool.execute(sql, [subscription]);
  logger.info(`selectPushSubscription : query success : ${JSON.stringify(rows)}`);
  return rows;
}

export async function selectPushSubscriptionByUser(userId) {
  const sql = 'SELECT sub FROM push_subscription WHERE userId=?';
  const [rows] = await pool.execute(sql, [userId]);
  logger.info(`selectPushSubscriptionByUser : query success : ${JSON.stringify(rows)}`);
  return rows;
}
