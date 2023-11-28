import { Server, Socket } from 'socket.io';
import { runNonTxnReturn, runNonTxnVoid } from './transactionUtils';
import chatService from '@src/services/chatService';

const configureSocket = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    socket.on('chatMessage', async (data) => {
      try {
        const { roomId, message, receiverId, senderId } = data;
        const dataa = [roomId, senderId, receiverId, message];
        const { insertId, createdAt } = await runNonTxnReturn(
          await chatService.createChatMessage(dataa),
        );
        data.id = insertId;
        data.createdAt = createdAt;
        io.emit('message', data);
      } catch (error) {
        console.error('메시지 저장 중 에러:', error);
      }
    });
  });
};

export default configureSocket;
