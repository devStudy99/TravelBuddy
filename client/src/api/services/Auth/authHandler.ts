import {
  HandleLoginProps,
  HandleRequestVerificationCodeProps,
  HandleSingUpProps,
  HandleVerifyVerificationCodeProps,
} from '@services/Auth/authTypes';
import { HttpCodes } from '@src/types/httpCodes';
import { formatDate } from '@utils/format';
import Swal from 'sweetalert2';

export const handleLogin = async ({ login, loginFormData }: HandleLoginProps) => {
  try {
    await login(loginFormData).unwrap();
  } catch (error) {
    Swal.fire({
      title: '로그인 실패',
      icon: 'error',
    });
  }
};

export const handleSignUp = async ({ signUp, signUpFormData }: HandleSingUpProps) => {
  try {
    const { email, password, name, phoneNumber, gender, birthDate } = signUpFormData;
    const userInfo = {
      email,
      password,
      name,
      phoneNumber: phoneNumber.replace(/-/g, ''),
      gender,
      birthDate: formatDate(birthDate),
    };
    const { message } = await signUp(userInfo).unwrap();
    Swal.fire({
      title: '회원가입 성공',
      text: message,
      icon: 'success',
    });
    return true;
  } catch (error) {
    Swal.fire({
      title: '회원가입 실패',
      text: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      icon: 'error',
    });
  }
};

export const handleRequestVerificationCode = async ({
  setIsVerificationCodeRequested,
  requestVerificationCode,
  startTimer,
  phoneNumber,
}: HandleRequestVerificationCodeProps) => {
  try {
    const { message } = await requestVerificationCode({ phoneNumber }).unwrap();
    Swal.fire({
      text: message,
      icon: 'success',
    });
    setIsVerificationCodeRequested(true);
    startTimer();
  } catch (error: any) {
    if (error.status === HttpCodes.CONFLICT) {
      Swal.fire({
        title: '휴대폰 번호 중복',
        text: '이미 가입된 휴대폰 번호입니다.',
        icon: 'error',
      });
    } else {
      Swal.fire({
        title: '인증번호 요청 실패',
        text: '인증번호 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        icon: 'error',
      });
    }
  }
};

export const handleVerifyVerificationCode = async ({
  setIsAuthenticated,
  verifyVerificationCode,
  stopTimer,
  phoneNumber,
  verificationCode,
}: HandleVerifyVerificationCodeProps) => {
  try {
    const { message } = await verifyVerificationCode({ phoneNumber, verificationCode }).unwrap();
    Swal.fire({
      text: message,
      icon: 'success',
    });
    setIsAuthenticated(true);
    stopTimer();
  } catch (error: any) {
    Swal.fire({
      title: '인증번호 검증 실패',
      text: error.data.message,
      icon: 'error',
    });
  }
};
