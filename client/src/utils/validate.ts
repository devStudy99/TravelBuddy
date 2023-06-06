import { BirthDate, SignUpFormData } from '@components/Auth/SignUp/SignUpTypes';
import { phoneNumberRegex } from '@utils/regex';
import { UseFormClearErrors, UseFormGetValues, UseFormSetError } from 'react-hook-form';

interface Validate {
  getValues: UseFormGetValues<SignUpFormData>;
  setError: UseFormSetError<SignUpFormData>;
  clearErrors: UseFormClearErrors<SignUpFormData>;
}

export const validatePhoneNumber = ({ getValues, setError, clearErrors }: Validate) => {
  const phoneNumber = getValues('phoneNumber');
  if (phoneNumber === '') {
    setError('phoneNumber', {
      message: '핸드폰 번호를 입력해주세요!',
    });
    return false;
  }
  if (!phoneNumberRegex.test(phoneNumber)) {
    setError('phoneNumber', {
      message: '010으로 시작하는 11자리 핸드폰 번호를 입력해주세요.',
    });
    return false;
  }
  clearErrors('phoneNumber');
  return true;
};

export const validateVerificationCode = ({ getValues, setError, clearErrors }: Validate) => {
  const verificationCode = getValues('verificationCode');
  if (verificationCode === '') {
    setError('verificationCode', {
      message: '인증번호를 입력해주세요!',
    });
    return false;
  }
  if (verificationCode.length !== 6) {
    setError('verificationCode', {
      message: '인증번호를 확인해주세요.',
    });
    return false;
  }
  clearErrors('verificationCode');
  return true;
};

export const validateBirthDate = (birthDate: BirthDate) => () => {
  const { year, month, date } = birthDate;
  if (year === 0 || month === 0 || date === 0) {
    return '생년월일을 선택해주세요!';
  }
  const lastDayOfMonth = new Date(Number(year), Number(month), 0).getDate();
  if (Number(date) > lastDayOfMonth) {
    return '생년월일을 다시 확인해주세요!';
  }
  return undefined;
};
