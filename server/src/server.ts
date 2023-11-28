import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import passport from 'passport';

import { createServer } from 'http';
import { Server } from 'socket.io';
import configureSocket from './utils/io';

import logger from '@utils/loggerUtils';

import sessionConfig from '@config/sessionConfig';
import { testConnection } from '@config/mysqlConfig';
import passportConfig from '@passport/index';
import authRouter from '@routers/authRouter';
import userRouter from '@routers/userRouter';
import accompanyRouter from '@routers/accompanyRouter';
import ErrorHandler from '@src/middlewares/errorMiddleware';
import chatRouter from './routers/chatRouter';
import mypageRouter from './routers/mypageRouter';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
passportConfig();
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

configureSocket(io);

if (process.env.NODE_ENV === 'production') {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors());
  app.set('trust proxy', 1);
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
testConnection();

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/accompany', accompanyRouter);
app.use('/chat', chatRouter);
app.use('/mypage', mypageRouter);

app.use(ErrorHandler);

httpServer.listen(process.env.SERVER_PORT || 8080, () => {
  logger.info('Server is running on port 8080');
});
