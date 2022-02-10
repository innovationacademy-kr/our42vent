import pool from '../config/createMySQLPool.js';
import { logger } from '../config/winston.js';

export async function insertPushSubscription(userId, subscription) {
  const sql =
    'INSERT INTO push_subscription (sub, userId) VALUES (?, ?) ON DUPLICATE KEY ' +
    'UPDATE updatedAt=CURRENT_TIMESTAMP';

  const [rows] = await pool.execute(sql, [subscription, userId]);
  logger.info(`insertPushSubscription : query success : ${JSON.stringify(rows)}`);
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
