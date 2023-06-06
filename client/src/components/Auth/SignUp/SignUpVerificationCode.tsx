import { ChangeEvent } from 'react';
import { SignUpVerificationCodeProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';
import { AuthCountDown } from '@Auth/AuthContainer.styles';
import { formatTime, formatVerificationCode } from '@utils/format';

const SignUpVerificationCode = ({
  register,
  errors,
  remainingTime,
  isAuthenticated,
}: SignUpVerificationCodeProps): JSX.Element => {
  return (
    <InputWrapper className="relative">
      <Label>인증번호</Label>
      <Input
        {...register('verificationCode', {
          required: '인증번호를 입력해주세요!',
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatVerificationCode(e.target.value);
            e.target.value = formattedValue;
          },
        })}
        placeholder="인증번호를 입력해주세요."
        type="text"
        maxLength={6}
      />
      {!isAuthenticated && <AuthCountDown>{formatTime(remainingTime)}</AuthCountDown>}
      {errors.verificationCode && <ErrorMessage>{errors.verificationCode.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpVerificationCode;
