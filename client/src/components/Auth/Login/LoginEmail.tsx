import { LoginInputProps } from '@Login/LoginTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';

const LoginEmail = ({ register, errors }: LoginInputProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>이메일</Label>
      <Input
        {...register('email', {
          required: '이메일을 입력해주세요!',
        })}
        placeholder="이메일을 입력해주세요."
        type="text"
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default LoginEmail;
