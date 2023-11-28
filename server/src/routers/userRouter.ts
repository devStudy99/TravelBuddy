import userController from '@src/controllers/userController';
import { isLoggedIn } from '@src/middlewares/authMiddleware';
import userService from '@src/services/userService';
import { runNonTxnVoid } from '@src/utils/transactionUtils';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', isLoggedIn, userController.getUser);

userRouter.get('/create', async (req, res, next) => {
  try {
    await runNonTxnVoid(await userService.createFakeUsers());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;
