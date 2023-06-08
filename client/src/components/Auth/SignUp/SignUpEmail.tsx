import { ChangeEvent, useEffect, useState } from 'react';
import { SignUpInputProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';
import { emailRegex } from '@utils/regex';
import { useCheckEmailDuplicateQuery } from '@features/Auth/authApi';

const SignUpEmail = ({ register, errors }: SignUpInputProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { error } = useCheckEmailDuplicateQuery({ email }, { skip: !email });

  useEffect(() => {
    if (error) {
      setErrorMessage('이미 가입된 이메일 입니다. 다른 이메일을 입력해주세요.');
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return (
    <InputWrapper>
      <Label>이메일</Label>
      <Input
        {...register('email', {
          required: '이메일을 입력해주세요!',
          pattern: {
            value: emailRegex,
            message: '이메일 형식이 올바르지 않습니다.',
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          },
        })}
        placeholder="이메일을 입력해주세요."
        type="text"
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!errorMessage && errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpEmail;
