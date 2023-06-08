import {
  HandleLoginProps,
  HandleRequestVerificationCodeProps,
  HandleSingUpProps,
  HandleVerifyVerificationCodeProps,
} from '@features/Auth/authTypes';
import { HttpCodes } from '@src/types/httpCodes';
import { formatDate } from '@utils/format';
import Swal from 'sweetalert2';

export const handleLogin = async ({ login, loginFormData, navigate }: HandleLoginProps) => {
  try {
    await login(loginFormData).unwrap();
    navigate('/');
    window.location.reload();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '로그인 실패',
      text: '로그인 정보를 확인해주세요',
    });
  }
};

export const handleSignUp = async ({ signUp, signUpFormData, navigate }: HandleSingUpProps) => {
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
    await signUp(userInfo).unwrap();
    Swal.fire({
      icon: 'success',
      title: '회원가입 성공',
      text: `${name}님 버디와 함께 새로운 추억을 만드세요!`,
    });
    navigate('/');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '회원가입 실패',
      text: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
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
    await requestVerificationCode({ phoneNumber }).unwrap();
    Swal.fire({
      icon: 'success',
      title: '인증번호 요청 성공',
      text: '인증 코드가 전송되었습니다.',
    });
    setIsVerificationCodeRequested(true);
    startTimer();
  } catch (error: any) {
    if (error.status === HttpCodes.CONFLICT) {
      Swal.fire({
        icon: 'error',
        title: '휴대폰 번호 중복',
        text: '이미 가입된 휴대폰 번호입니다.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '인증번호 요청 실패',
        text: '인증번호 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
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
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '인증번호 검증 실패',
      text: '인증코드를 확인해주세요',
    });
  }
};
