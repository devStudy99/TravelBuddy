import { PoolConnection } from 'mysql2/promise';
import { getConnection, releaseConnection } from '@src/config/mysqlConfig';
import logger from './loggerUtils';

type AsyncVoidFunction = (conn: PoolConnection) => Promise<void>;
type AsyncAnyFunction = (conn: PoolConnection) => Promise<any>;

const runTxnReturn = async (logic: AsyncAnyFunction): Promise<any> => {
  let conn;
  try {
    conn = await getConnection();
    await conn.beginTransaction();
    const result = await logic(conn);
    await conn.commit();
    return result;
  } catch (error) {
    if (conn) {
      conn.rollback();
    }
    logger.error(error);
    throw error;
  } finally {
    if (conn) {
      releaseConnection(conn);
    }
  }
};

const runTxnVoid = async (logic: AsyncVoidFunction): Promise<void> => {
  let conn;
  try {
    conn = await getConnection();
    await conn.beginTransaction();
    await logic(conn);
    await conn.commit();
  } catch (error) {
    if (conn) {
      conn.rollback();
    }
    logger.error(error);
    throw error;
  } finally {
    if (conn) {
      releaseConnection(conn);
    }
  }
};

const runNonTxnReturn = async (logic: AsyncAnyFunction): Promise<any> => {
  let conn;
  try {
    conn = await getConnection();
    await logic(conn);
  } catch (error) {
    logger.error(error);
    throw error;
  } finally {
    if (conn) {
      releaseConnection(conn);
    }
  }
};

const runNonTxnVoid = async (logic: AsyncVoidFunction): Promise<void> => {
  let conn;
  try {
    conn = await getConnection();
    await logic(conn);
  } catch (error) {
    logger.error(error);
    throw error;
  } finally {
    if (conn) {
      releaseConnection(conn);
    }
  }
};

export { runTxnReturn, runTxnVoid, runNonTxnReturn, runNonTxnVoid };
