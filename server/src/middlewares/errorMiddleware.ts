import { Request, Response, NextFunction } from 'express';
import { HttpCodes } from '@src/types/httpCodes';
import logger from '@src/utils/loggerUtils';

export class HttpException extends Error {
  status: number;
  constructor(status?: number, message?: string) {
    super(message);
    this.status = status || HttpCodes.INTERNAL_SERVER_ERROR;
  }
}

export const handleDbError = (error: unknown): never => {
  if (error instanceof Error && 'sql' in error) {
    logger.error(`errMsg: ${error.message}`);
    logger.error(`errQuery: ${error.sql}`);
  }
  throw new HttpException(HttpCodes.INTERNAL_SERVER_ERROR, 'DB 서버 에러');
};

const ErrorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const errStatus = error.status;
  const errMsg = error.message || 'Something went wrong';
  logger.error(`errStatus: ${errStatus}, errMsg: ${errMsg}`);
  res.status(errStatus).json({
    message: errMsg,
  });
};

export default ErrorHandler;
