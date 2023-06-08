import authClient from '@features/Auth/authClient';
import {
  authResponse,
  LoginPayload,
  SignUpPayload,
  CheckEmailDuplicatePayload,
  CheckNameDuplicatePayload,
  VerifyVerificationCodePayload,
  RequestVerificationCodePayload,
} from '@features/Auth/authTypes';

export const authEndpoint = authClient.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<authResponse, LoginPayload>({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    signUp: builder.mutation<authResponse, SignUpPayload>({
      query: (signUpData) => ({
        url: '/signup',
        method: 'POST',
        body: signUpData,
      }),
    }),
    logout: builder.mutation<authResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    checkEmailDuplicate: builder.query<authResponse, CheckEmailDuplicatePayload>({
      query: ({ email }) => ({
        url: 'checkEmailDuplicate',
        method: 'GET',
        params: { email },
      }),
    }),
    checkNameDuplicate: builder.query<authResponse, CheckNameDuplicatePayload>({
      query: ({ name }) => ({
        url: 'checkNameDuplicate',
        method: 'GET',
        params: { name },
      }),
    }),
    requestVerificationCode: builder.mutation<authResponse, RequestVerificationCodePayload>({
      query: (phoneNumber) => ({
        url: '/request-verification-code',
        method: 'POST',
        body: phoneNumber,
      }),
    }),
    verifyVerificationCode: builder.mutation<authResponse, VerifyVerificationCodePayload>({
      query: (verifyData) => ({
        url: '/verify-verification-code',
        method: 'POST',
        body: verifyData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useCheckEmailDuplicateQuery,
  useCheckNameDuplicateQuery,
  useRequestVerificationCodeMutation,
  useVerifyVerificationCodeMutation,
} = authEndpoint;
