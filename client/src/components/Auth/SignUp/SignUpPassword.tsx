import { passwordRegex } from '@utils/regex';
import { SignUpInputProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';

const SignUpPassword = ({ register, errors }: SignUpInputProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>비밀번호</Label>
      <Input
        {...register('password', {
          required: '비밀번호를 입력해주세요!',
          pattern: {
            value: passwordRegex,
            message: '비밀번호(8자~12자, 영문+숫자+특수문자 사용)',
          },
        })}
        placeholder="비밀번호를 입력해주세요."
        type="password"
      />
      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpPassword;
