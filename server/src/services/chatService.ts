import chatRepository from '@src/repository/chatRepository';
import { PoolConnection } from 'mysql2/promise';

const createMessage = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      return await chatRepository.createMessage(conn, data);
    } catch (error) {
      throw error;
    }
  };
};

const createChatRoom = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      const isRoomExist = await chatRepository.checkChatRoom(conn, data);
      if (!isRoomExist) {
        await chatRepository.createChatRoom(conn, data);
      }
      return isRoomExist;
    } catch (error) {
      throw error;
    }
  };
};

const getChatRoomsByUserId = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      return await chatRepository.getChatRoomsByUserId(conn, data);
    } catch (error) {
      throw error;
    }
  };
};

const getChatMessagesByRoomId = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      return await chatRepository.getChatMessagesByRoomId(conn, data);
    } catch (error) {
      throw error;
    }
  };
};

const createChatMessage = async (data: any) => {
  return async (conn: PoolConnection) => {
    try {
      return await chatRepository.createChatMessage(conn, data);
    } catch (error) {
      throw error;
    }
  };
};

export default {
  createMessage,
  createChatRoom,
  getChatRoomsByUserId,
  getChatMessagesByRoomId,
  createChatMessage,
};
