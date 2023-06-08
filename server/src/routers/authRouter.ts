import { Router } from 'express';
import authController from '@src/controllers/authController';
import { isLoggedIn, isNotLoggedIn } from '@src/middlewares/authMiddleware';

const authRouter = Router();

authRouter.post('/login', isNotLoggedIn, authController.login);

authRouter.post('/logout', isLoggedIn, authController.logout);

authRouter.post('/signup', isNotLoggedIn, authController.signUp);

authRouter.post(
  '/request-verification-code',
  isNotLoggedIn,
  authController.requestVerificationCode,
);

authRouter.post('/verify-verification-code', isNotLoggedIn, authController.verifyVerificationCode);

authRouter.get('/checkEmailDuplicate', isNotLoggedIn, authController.checkEmailDuplicate);

authRouter.get('/checkNameDuplicate', isNotLoggedIn, authController.checkNameDuplicate);

export default authRouter;
