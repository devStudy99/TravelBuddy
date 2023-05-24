import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import session from 'express-session';

import sessionConfig from '@src/config/sessionConfig';
import { testConnection } from '@src/config/mysqlConfig';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

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
app.use(session(sessionConfig));
testConnection();

export default app;
