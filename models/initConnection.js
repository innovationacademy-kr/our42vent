import tunnel from 'tunnel-ssh';
import { readFileSync } from 'fs';
import mysql from 'mysql';
import consoleLogger from '../controllers/consoleLogger.js';

export default class InitMySQLConnection {
  constructor(name) {
    this.name = name;
    const sshConfig = {
      username: process.env.SSH_USER,
      host: process.env.SSH_HOST,
      dstHost: process.env.SSH_DATABASE_HOST,
      dstPort: process.env.SSH_DATABASE_PORT,
      privateKey: readFileSync(process.env.HOME + process.env.SSH_PEM_DIR),
    };

    this.server = tunnel(sshConfig, (error, server) => {
      try {
        if (error) {
          throw error;
        } else if (server === null) {
          throw new Error('Error in get server');
        }
      } catch (error) {
        consoleLogger.error(error);
      }
      this.pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5, // max connections
      });
    });
  }
}
