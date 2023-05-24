import mysql, { PoolConnection } from 'mysql2/promise';
import envConfig from '@src/config/envConfig';

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

export { getConnection, releaseConnection };
