import { useState } from 'react';
import { BirthDate, SignUpBirthDateProps } from '@SignUp/SignUpTypes';
import { ErrorMessage, InputWrapper, Label, Select } from '@components/Common/Common.styles';
import { BirthDateControllerWrapper } from './SignUpBirthDate.styles';
import { Controller } from 'react-hook-form';
import { validateBirthDate } from '@utils/validate';

const SignUpBrithDate = ({ control, errors }: SignUpBirthDateProps): JSX.Element => {
  const [birthDate, setBirthDate] = useState<BirthDate>({
    year: 0,
    month: 0,
    date: 0,
  });

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 14;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, index) => maxYear - index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const dates = Array.from(
    { length: new Date(Number(birthDate.year), Number(birthDate.month), 0).getDate() },
    (_, index) => index + 1,
  );

  return (
    <InputWrapper>
      <Label>생일</Label>
      <BirthDateControllerWrapper>
        <Controller
          name="birthDate.year"
          defaultValue="년"
          control={control}
          rules={{ validate: validateBirthDate(birthDate) }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                const year = value as number;
                field.onChange(year);
                setBirthDate({ ...birthDate, year });
              }}
              options={years.map((year: number) => ({
                value: year,
                label: `${year}년`,
              }))}
            />
          )}
        />
        <Controller
          name="birthDate.month"
          defaultValue="월"
          control={control}
          rules={{ validate: validateBirthDate(birthDate) }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                const month = value as number;
                field.onChange(month);
                setBirthDate({ ...birthDate, month });
              }}
              options={months.map((month: number) => ({ value: month, label: `${month}월` }))}
            />
          )}
        />
        <Controller
          name="birthDate.date"
          defaultValue="일"
          control={control}
          rules={{ validate: validateBirthDate(birthDate) }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(value) => {
                const date = value as number;
                field.onChange(date);
                setBirthDate({ ...birthDate, date });
              }}
              options={dates.map((date: number) => ({ value: date, label: `${date}일` }))}
            />
          )}
        />
      </BirthDateControllerWrapper>
      {errors.birthDate?.year ? (
        <ErrorMessage>{errors.birthDate.year.message}</ErrorMessage>
      ) : errors.birthDate?.month ? (
        <ErrorMessage>{errors.birthDate.month.message}</ErrorMessage>
      ) : errors.birthDate?.date ? (
        <ErrorMessage>{errors.birthDate.date.message}</ErrorMessage>
      ) : null}
    </InputWrapper>
  );
};

export default SignUpBrithDate;
