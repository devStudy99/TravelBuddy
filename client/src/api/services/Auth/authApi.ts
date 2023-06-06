import authClient from '@api/authClient';
import {
  LoginPayload,
  SignUpPayload,
  CheckEmailDuplicatePayload,
  CheckNameDuplicatePayload,
  VerifyVerificationCodePayload,
  RequestVerificationCodePayload,
} from '@services/Auth/authTypes';

export const authEndpoint = authClient.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData: LoginPayload) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    signUp: builder.mutation({
      query: (signUpData: SignUpPayload) => ({
        url: '/signup',
        method: 'POST',
        body: signUpData,
      }),
    }),
    checkEmailDuplicate: builder.query({
      query: ({ email }: CheckEmailDuplicatePayload) => ({
        url: 'checkEmailDuplicate',
        method: 'GET',
        params: { email },
      }),
    }),
    checkNameDuplicate: builder.query({
      query: ({ name }: CheckNameDuplicatePayload) => ({
        url: 'checkNameDuplicate',
        method: 'GET',
        params: { name },
      }),
    }),
    requestVerificationCode: builder.mutation({
      query: (phoneNumber: RequestVerificationCodePayload) => ({
        url: '/request-verification-code',
        method: 'POST',
        body: phoneNumber,
      }),
    }),
    verifyVerificationCode: builder.mutation({
      query: (verifyData: VerifyVerificationCodePayload) => ({
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
  useCheckEmailDuplicateQuery,
  useCheckNameDuplicateQuery,
  useRequestVerificationCodeMutation,
  useVerifyVerificationCodeMutation,
} = authEndpoint;
