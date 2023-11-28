import { Router } from 'express';
import { isLoggedIn } from '@src/middlewares/authMiddleware';
import chatController from '@src/controllers/chatController';

const chatRouter = Router();

chatRouter.post('/rooms', isLoggedIn, chatController.createChatRoom);

chatRouter.get('/rooms', isLoggedIn, chatController.getChatRooms);

export default chatRouter;
