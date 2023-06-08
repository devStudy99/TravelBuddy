import { RequestHandler } from 'express';
import passport from 'passport';
import authService from '@services/authService';
import { runNonTxnReturn, runNonTxnVoid } from '@utils/transactionUtils';
import { deleteVerificationCode, getVerificationCode } from '@utils/verificationCode';
import { sendSMS } from '@utils/sendSMS';
import { HttpCodes } from '@src/types/httpCodes';
import userService from '@src/services/userService';
import { UserInfo } from '@src/types/user';

const login: RequestHandler = (req, res, next) => {
  passport.authenticate(
    'local',
    async (authError: unknown, user: UserInfo, info: { message: string }) => {
      if (authError) {
        return next(authError);
      }
      if (!user) {
        return res.status(HttpCodes.UNAUTHORIZED).json({ message: '로그인 정보를 확인해주세요.' });
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }
        res.status(HttpCodes.OK).json({ message: '사용자가 성공적으로 로그인되었습니다' });
      });
    },
  )(req, res, next);
};

const logout: RequestHandler = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.status(HttpCodes.OK).json({ message: '사용자가 성공적으로 로그아웃되었습니다.' });
  });
};

const signUp: RequestHandler = async (req, res, next) => {
  try {
    const userInfo = req.body;
    await runNonTxnVoid(await userService.createUser(userInfo));
    res.status(HttpCodes.CREATED).json({ message: '사용자가 성공적으로 가입되었습니다' });
  } catch (error) {
    next(error);
  }
};

const requestVerificationCode: RequestHandler = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const isDuplicated = await runNonTxnReturn(
      await authService.checkPhoneNumberDuplicate(phoneNumber),
    );
    if (isDuplicated) {
      return res.status(HttpCodes.CONFLICT).json({ message: '이미 사용 중인 휴대폰 번호입니다.' });
    }
    const exVerificationCode = await getVerificationCode(phoneNumber);
    if (exVerificationCode) {
      await deleteVerificationCode(phoneNumber);
    }
    await sendSMS(phoneNumber);
    res.status(HttpCodes.OK).json({ message: '인증 코드가 전송되었습니다' });
  } catch (error) {
    next(error);
  }
};

const verifyVerificationCode: RequestHandler = async (req, res, next) => {
  try {
    const { verificationCode, phoneNumber } = req.body;
    const exVerificationCode = await getVerificationCode(phoneNumber);
    if (verificationCode !== exVerificationCode) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: '잘못된 인증 코드입니다' });
    }
    await deleteVerificationCode(phoneNumber);
    res.status(HttpCodes.OK).json({ message: '인증 코드가 확인되었습니다' });
  } catch (error) {
    next(error);
  }
};

const checkEmailDuplicate: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (typeof email === 'string') {
      const isDuplicated = await runNonTxnReturn(await authService.checkEmailDuplicate(email));
      if (isDuplicated) {
        return res.status(HttpCodes.CONFLICT).json({ message: '이미 사용 중인 이메일입니다.' });
      }
      res.status(HttpCodes.OK).json({ message: '사용 가능한 이메일입니다' });
    }
  } catch (error) {
    next(error);
  }
};

const checkNameDuplicate: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (typeof name === 'string') {
      const isDuplicated = await runNonTxnReturn(await authService.checkNameDuplicate(name));
      if (isDuplicated) {
        return res.status(HttpCodes.CONFLICT).json({ message: '이미 사용 중인 이름입니다' });
      }
      res.status(HttpCodes.OK).json({ message: '사용 가능한 이름입니다' });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  signUp,
  logout,
  verifyVerificationCode,
  requestVerificationCode,
  checkEmailDuplicate,
  checkNameDuplicate,
};
