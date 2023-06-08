import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';
import { SignUpPasswordConfirmInputProps } from '@SignUp/SignUpTypes';

const SignUpPwdConfirmInput = ({
  register,
  errors,
  watch,
}: SignUpPasswordConfirmInputProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>비밀번호 확인</Label>
      <Input
        {...register('passwordConfirm', {
          required: '비밀번호를 입력해주세요!',
          validate: (passwordConfirm: string) => {
            if (watch('password') !== passwordConfirm) {
              return '비밀번호를 다시 확인해주세요!';
            }
            return undefined;
          },
        })}
        placeholder="비밀번호를 다시 입력해주세요."
        type="password"
      />
      {errors.passwordConfirm && <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpPwdConfirmInput;
