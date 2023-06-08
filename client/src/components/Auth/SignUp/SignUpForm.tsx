import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SignUpEmail from '@SignUp/SignUpEmail';
import SignUpPassword from '@SignUp/SignUpPassword';
import SignUpPasswordConfirm from '@SignUp/SignUpPasswordConfirm';
import SignUpName from '@SignUp/SignUpName';
import SignUpPhoneNumber from '@SignUp/SignUpPhoneNumber';
import SignUpVerificationCode from '@SignUp/SignUpVerificationCode';
import SignUpGenderSelect from '@SignUp/SignUpGender';
import SignUpBrithDate from '@SignUp/SignUpBrithDate';
import SignUpAgreement from '@SignUp/SignUpAgreement';
import { MarginBottomInput } from '@Common/Common.styles';
import { AuthBtn, AuthFormContainer } from '@Auth/AuthContainer.styles';
import { InputWithBtnWraaper, VerifyBtn } from '@SignUp/SignUpForm.styles';
import { SignUpFormData } from '@SignUp/SignUpTypes';
import {
  handleRequestVerificationCode,
  handleSignUp,
  handleVerifyVerificationCode,
} from '@features/Auth/authHandler';
import {
  useRequestVerificationCodeMutation,
  useSignUpMutation,
  useVerifyVerificationCodeMutation,
} from '@features/Auth/authApi';
import { useTimer } from '@hooks/useTimer';
import { timerAlert } from '@utils/customSweetAlert';
import { validatePhoneNumber, validateVerificationCode } from '@utils/validate';
import Swal from 'sweetalert2';

const SignUpForm = (): JSX.Element => {
  const {
    register,
    watch,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isVerificationCodeRequested, setIsVerificationCodeRequested] = useState<boolean>(false);
  const [requestVerificationCode] = useRequestVerificationCodeMutation();
  const [verifyVerificationCode] = useVerifyVerificationCodeMutation();
  const [signUp] = useSignUpMutation();
  const [remainingTime, startTimer, stopTimer] = useTimer(180);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(async (signUpFormData: SignUpFormData) => {
      if (!isAuthenticated) {
        Swal.fire({
          icon: 'info',
          title: '휴대폰 번호 인증을 해주세요!',
        });
        return;
      }
      if (!isAgreed) {
        Swal.fire({
          icon: 'info',
          title: '필수 동의 여부를 확인해주세요!',
        });
        return;
      }
      handleSignUp({ signUp, signUpFormData, navigate });
    })();
  };

  const requestVerificationCodeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isPhoneNumberVaild = validatePhoneNumber({ getValues, setError, clearErrors });
    if (!isPhoneNumberVaild) return;
    const phoneNumber = getValues('phoneNumber').replace(/-/g, '');
    handleRequestVerificationCode({
      setIsVerificationCodeRequested,
      requestVerificationCode,
      startTimer,
      phoneNumber,
    });
  };

  const resendVerificationCodeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAuthenticated) {
      Swal.fire({
        icon: 'info',
        title: '휴대폰 번호 인증 완료',
        text: '이미 휴대폰 번호 인증이 완료되었습니다.',
      });
      return;
    }
    const hasPassedTimeLimit = timerAlert(remainingTime);
    if (!hasPassedTimeLimit) return;
    requestVerificationCodeClick(e);
  };

  const verifyVerificationCodeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (remainingTime === 0) {
      Swal.fire({
        icon: 'error',
        title: '인증번호 검증 실패',
        text: '인증 시간이 만료되었습니다. 인증번호를 다시 요청주세요.',
      });
      return;
    }
    const isVerificationCodeValid = validateVerificationCode({ getValues, setError, clearErrors });
    if (!isVerificationCodeValid) return;
    const isPhoneNumberVaild = validatePhoneNumber({ getValues, setError, clearErrors });
    if (!isPhoneNumberVaild) return;
    const phoneNumber = getValues('phoneNumber').replace(/-/g, '');
    const verificationCode = getValues('verificationCode');
    handleVerifyVerificationCode({
      setIsAuthenticated,
      verifyVerificationCode,
      phoneNumber,
      verificationCode,
      stopTimer,
    });
  };

  return (
    <AuthFormContainer onSubmit={onSubmit}>
      <MarginBottomInput>
        <SignUpEmail register={register} errors={errors} />
      </MarginBottomInput>
      <MarginBottomInput>
        <SignUpPassword register={register} errors={errors} />
      </MarginBottomInput>
      <MarginBottomInput>
        <SignUpPasswordConfirm register={register} errors={errors} watch={watch} />
      </MarginBottomInput>
      <MarginBottomInput>
        <SignUpName register={register} errors={errors} />
      </MarginBottomInput>
      <InputWithBtnWraaper>
        <SignUpPhoneNumber register={register} errors={errors} isAuthenticated={isAuthenticated} />
        {!isVerificationCodeRequested ? (
          <VerifyBtn
            $isError={!!errors.phoneNumber}
            type="button"
            onClick={requestVerificationCodeClick}
          >
            인증번호 요청
          </VerifyBtn>
        ) : (
          <VerifyBtn
            $isError={!!errors.phoneNumber}
            type="button"
            onClick={resendVerificationCodeClick}
          >
            재요청
          </VerifyBtn>
        )}
      </InputWithBtnWraaper>
      {isVerificationCodeRequested && (
        <InputWithBtnWraaper>
          <SignUpVerificationCode
            register={register}
            errors={errors}
            remainingTime={remainingTime}
            isAuthenticated={isAuthenticated}
          />
          {!isAuthenticated ? (
            <VerifyBtn
              type="button"
              $isError={!!errors.verificationCode}
              onClick={verifyVerificationCodeClick}
            >
              확인
            </VerifyBtn>
          ) : (
            <VerifyBtn
              type="button"
              $isError={!!errors.verificationCode}
              $isAuthenticated={isAuthenticated}
            >
              인증완료
            </VerifyBtn>
          )}
        </InputWithBtnWraaper>
      )}
      <MarginBottomInput>
        <SignUpGenderSelect control={control} errors={errors} />
      </MarginBottomInput>
      <MarginBottomInput>
        <SignUpBrithDate control={control} errors={errors} />
      </MarginBottomInput>
      <MarginBottomInput>
        <SignUpAgreement setIsAgreed={setIsAgreed} />
      </MarginBottomInput>
      <AuthBtn>회원가입</AuthBtn>
    </AuthFormContainer>
  );
};

export default SignUpForm;
