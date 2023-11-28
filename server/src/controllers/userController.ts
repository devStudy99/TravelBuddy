import userService from '@src/services/userService';
import { HttpCodes } from '@src/types/httpCodes';
import { runNonTxnReturn } from '@src/utils/transactionUtils';
import { RequestHandler } from 'express';

const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.status(HttpCodes.OK).json(req.user);
  } catch (error) {
    next(error);
  }
};

export default { getUser };
