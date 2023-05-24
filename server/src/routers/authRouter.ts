import { Router } from 'express';

const authRouter = Router();

authRouter.post('/join');

authRouter.post('/login');

authRouter.post('/logout');

export default authRouter;
