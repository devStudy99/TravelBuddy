import { ChangeEvent, useEffect, useState } from 'react';
import { SignUpInputProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, Input, InputWrapper, Label } from '@Common/Common.styles';
import { useCheckNameDuplicateQuery } from '@services/Auth/authApi';

const SignUpName = ({ register, errors }: SignUpInputProps): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { error } = useCheckNameDuplicateQuery({ name }, { skip: !name });

  useEffect(() => {
    if (error) {
      setErrorMessage('입력한 이름은 이미 사용 중입니다. 다른 이름을 입력해주세요.');
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return (
    <InputWrapper>
      <Label>이름</Label>
      <Input
        {...register('name', {
          required: '이름을 입력해주세요!',
          maxLength: {
            value: 10,
            message: '이름은 10자리까지만 입력할 수 있습니다.',
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          },
        })}
        placeholder="이름을 입력해주세요."
        type="text"
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!errorMessage && errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpName;
