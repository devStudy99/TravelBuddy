import mysql, { PoolConnection } from 'mysql2/promise';
import envConfig from '@src/config/envConfig';
import logger from '@src/utils/loggerUtils';

const { mysqlProps } = envConfig;
const db = mysql.createPool(mysqlProps);

const getConnection = async () => {
  try {
    const conn = await db.getConnection();
    return conn;
  } catch (error) {
    throw error;
  }
};

const releaseConnection = async (conn: PoolConnection) => {
  try {
    conn.release();
  } catch (error) {
    throw error;
  }
};

const testConnection = async () => {
  try {
    const conn = await db.getConnection();
    logger.info('MySQL connected');
    conn.release();
  } catch (error) {
    logger.error('Failed to connect to MySQL database:', error);
  }
};

export { getConnection, releaseConnection, testConnection };
