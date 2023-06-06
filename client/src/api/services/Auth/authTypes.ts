import { Dispatch, SetStateAction } from 'react';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { LoginFormData } from '@components/Auth/Login/LoginTypes';
import { SignUpFormData } from '@components/Auth/SignUp/SignUpTypes';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query';
import { UserInfo } from '@src/types/user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends UserInfo {
  password: string;
}

export interface CheckEmailDuplicatePayload {
  email: string;
}

export interface CheckNameDuplicatePayload {
  name: string;
}

export interface RequestVerificationCodePayload {
  phoneNumber: string;
}

export interface VerifyVerificationCodePayload {
  phoneNumber: string;
  verificationCode: string;
}

type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;
type MutationPayload<D> = MutationDefinition<D, BaseQuery, never, any, 'auth'>;

type LoginMutation = MutationPayload<LoginPayload>;
type SignUpMutation = MutationPayload<SignUpPayload>;
type RequestVerificationCodeMutation = MutationPayload<RequestVerificationCodePayload>;
type VerifyVerificationCodeMutation = MutationPayload<VerifyVerificationCodePayload>;

export interface HandleLoginProps {
  login: MutationTrigger<LoginMutation>;
  loginFormData: LoginFormData;
}

export interface HandleSingUpProps {
  signUp: MutationTrigger<SignUpMutation>;
  signUpFormData: SignUpFormData;
}

export interface HandleRequestVerificationCodeProps extends RequestVerificationCodePayload {
  setIsVerificationCodeRequested: Dispatch<SetStateAction<boolean>>;
  requestVerificationCode: MutationTrigger<RequestVerificationCodeMutation>;
  startTimer: () => void;
}

export interface HandleVerifyVerificationCodeProps extends VerifyVerificationCodePayload {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  verifyVerificationCode: MutationTrigger<VerifyVerificationCodeMutation>;
  stopTimer: () => void;
}
