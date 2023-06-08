import { RequestHandler } from 'express';

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send({ message: '로그인이 필요합니다.' });
  }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(409).json({ message: '이미 로그인된 상태입니다.' });
  }
};

export { isLoggedIn, isNotLoggedIn };
