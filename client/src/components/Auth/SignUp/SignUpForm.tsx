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
} from '@api/services/Auth/authHandler';
import {
  useRequestVerificationCodeMutation,
  useSignUpMutation,
  useVerifyVerificationCodeMutation,
} from '@api/services/Auth/authApi';
import { useTimer } from '@hooks/useTimer';
import {
  timerAlert,
  alreadyExpiredAlert,
  alreadyVerifiedAlert,
  notYetAgreedAlert,
  notYetVerifiedAlert,
} from '@utils/alert';
import { validatePhoneNumber, validateVerificationCode } from '@utils/validate';

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
        notYetVerifiedAlert();
        return;
      }
      if (!isAgreed) {
        notYetAgreedAlert();
        return;
      }
      const isSignUpSuccess = await handleSignUp({ signUp, signUpFormData });
      if (isSignUpSuccess) navigate('/');
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
      alreadyVerifiedAlert();
      return;
    }
    const hasPassedTimeLimit = timerAlert(remainingTime);
    if (!hasPassedTimeLimit) return;
    requestVerificationCodeClick(e);
  };

  const verifyVerificationCodeClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (remainingTime === 0) {
      alreadyExpiredAlert();
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
