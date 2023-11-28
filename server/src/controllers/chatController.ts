import chatService from '@src/services/chatService';
import userService from '@src/services/userService';
import { User } from '@src/types';
import { runNonTxnReturn, runTxnReturn } from '@src/utils/transactionUtils';
import { RequestHandler } from 'express';

// 각 채팅방에 대한 채팅 목록을 가져와서 chatRooms에 추가
const addChatRoomDetails = async (viewerId: any, chatRooms: any[]) => {
  for (const room of chatRooms) {
    const chatMessages = await runTxnReturn(await chatService.getChatMessagesByRoomId(room.id));
    room.messages = chatMessages;
    room.receiverId = room.user1Id === viewerId ? room.user2Id : room.user1Id;
    const userInfo = await runNonTxnReturn(await userService.getUserById(room.receiverId));
    room.receiverName = userInfo.name;
  }
};

const createChatRoom: RequestHandler = async (req, res, next) => {
  try {
    const { writerId } = req.body;
    const { id: viewerId } = req.user as User;
    const users = [viewerId, writerId];
    // 채팅방 존재여부 확인하고 존재하면 pass 존재안하면 생성
    const isRoomExist = await runTxnReturn(await chatService.createChatRoom(users));
    if (isRoomExist) {
      // 기존에 있던 채팅방이라 새로운 채팅방 목록 필요X이므로 null 리턴
      res.json(null);
    } else {
      // 새로운 채팅방이라 새로운 채팅방 목록 필요O이므로 새로운 채팅방 목록 리턴
      const chatRooms = await runNonTxnReturn(await chatService.getChatRoomsByUserId(viewerId));
      await addChatRoomDetails(viewerId, chatRooms);
      res.json(chatRooms);
    }
  } catch (error) {
    next(error);
  }
};

const getChatRooms: RequestHandler = async (req, res, next) => {
  try {
    const { id: viewerId } = req.user as User;
    const chatRooms = await runNonTxnReturn(await chatService.getChatRoomsByUserId(viewerId));
    await addChatRoomDetails(viewerId, chatRooms);
    res.json(chatRooms);
  } catch (error) {
    next(error);
  }
};

export default {
  createChatRoom,
  getChatRooms,
};
