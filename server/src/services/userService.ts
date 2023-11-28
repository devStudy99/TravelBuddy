import userRepository from '@src/repository/userRepository';
import { UserInfo } from '@src/types/user';
import { PoolConnection } from 'mysql2/promise';

const createUser = async (userInfo: UserInfo) => {
  return async (conn: PoolConnection) => {
    try {
      await userRepository.createUser(conn, userInfo);
    } catch (error) {
      throw error;
    }
  };
};

const getUser = async () => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUser(conn);
      if (rows) {
        return rows[0];
      }
    } catch (error) {
      throw error;
    }
  };
};

const getUserByEmail = async (email: string) => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUserByEmail(conn, email);
      if (rows) {
        return rows[0];
      }
    } catch (error) {
      throw error;
    }
  };
};

const getUserById = async (id: number) => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUserById(conn, id);
      if (rows) {
        return rows[0];
      }
    } catch (error) {
      throw error;
    }
  };
};

const createFakeUsers = async () => {
  return async (conn: PoolConnection) => {
    try {
      await userRepository.createFakeUsers(conn);
    } catch (error) {
      throw error;
    }
  };
};

export default { createUser, getUser, getUserByEmail, getUserById, createFakeUsers };
