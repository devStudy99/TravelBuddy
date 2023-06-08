import { PoolConnection } from 'mysql2/promise';
import userRepository from '@src/repository/userRepository';

const checkEmailDuplicate = async (email: string) => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUserByEmail(conn, email);
      if (rows) {
        return rows.length > 0;
      }
    } catch (error) {
      throw error;
    }
  };
};

const checkNameDuplicate = async (name: string) => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUserByName(conn, name);
      if (rows) {
        return rows.length > 0;
      }
    } catch (error) {
      throw error;
    }
  };
};

const checkPhoneNumberDuplicate = async (phoneNumber: string) => {
  return async (conn: PoolConnection) => {
    try {
      const rows = await userRepository.getUserByPhoneNumber(conn, phoneNumber);
      if (rows) {
        return rows.length > 0;
      }
    } catch (error) {
      throw error;
    }
  };
};

export default { checkEmailDuplicate, checkNameDuplicate, checkPhoneNumberDuplicate };
