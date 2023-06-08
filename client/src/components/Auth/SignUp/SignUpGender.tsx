import { Controller } from 'react-hook-form';
import { SignUpGenderProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, InputWrapper, Label, Select } from '@Common/Common.styles';

const SignUpGender = ({ control, errors }: SignUpGenderProps): JSX.Element => {
  return (
    <InputWrapper>
      <Label>성별</Label>
      <Controller
        name="gender"
        control={control}
        rules={{ required: '성별을 선택해주세요!' }}
        render={({ field }) => (
          <Select
            defaultValue="성별"
            {...field}
            options={[
              { value: 'Male', label: '남성' },
              { value: 'Female', label: '여성' },
            ]}
          />
        )}
      />
      {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
    </InputWrapper>
  );
};

export default SignUpGender;
