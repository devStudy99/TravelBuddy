import { ChangeEvent } from 'react';
import { SignUpPhoneNumberProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';
import { phoneNumberRegex } from '@utils/regex';
import { formatPhoneNumber } from '@utils/format';

const SignUpPhoneNumber = ({
  register,
  errors,
  isAuthenticated,
}: SignUpPhoneNumberProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>핸드폰 번호</Label>
      <Input
        {...register('phoneNumber', {
          required: '핸드폰 번호를 입력해주세요!',
          pattern: {
            value: phoneNumberRegex,
            message: '010으로 시작하는 11자리 핸드폰 번호를 입력해주세요.',
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatPhoneNumber(e.target.value);
            e.target.value = formattedValue;
          },
        })}
        placeholder="핸드폰 번호를 입력해주세요."
        type="text"
        maxLength={13}
        disabled={isAuthenticated}
      />
      {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpPhoneNumber;
