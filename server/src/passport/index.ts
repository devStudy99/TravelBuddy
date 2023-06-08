import passport from 'passport';
import local from '@passport/localStrategy';
import { User } from '@src/types';
import userService from '@src/services/userService';
import { runNonTxnReturn } from '@src/utils/transactionUtils';

export default () => {
  passport.serializeUser((user: User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await runNonTxnReturn(await userService.getUserById(id));
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  local();
};
