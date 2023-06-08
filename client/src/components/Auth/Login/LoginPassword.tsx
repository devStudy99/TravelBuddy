import { LoginInputProps } from '@Login/LoginTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';

const LoginPassword = ({ register, errors }: LoginInputProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>비밀번호</Label>
      <Input
        {...register('password', {
          required: '비밀번호를 입력해주세요!',
        })}
        placeholder="비밀번호를 입력해주세요."
        type="password"
      />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default LoginPassword;
