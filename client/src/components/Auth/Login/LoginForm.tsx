import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoginEmail from '@components/Auth/Login/LoginEmail';
import LoginPassword from '@components/Auth/Login/LoginPassword';
import { FindPasswordText, FindPasswordWrapper } from '@Login/LoginForm.styles';
import { MarginBottomInput } from '@Common/Common.styles';
import { AuthBtn, AuthFormContainer } from '@Auth/AuthContainer.styles';
import { LoginFormData } from '@Login/LoginTypes';
import { useLoginMutation } from '@features/Auth/authApi';
import { handleLogin } from '@features/Auth/authHandler';

const LoginForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit((loginFormData: LoginFormData) => {
      handleLogin({ login, loginFormData, navigate });
    })();
  };

  return (
    <>
      <AuthFormContainer onSubmit={onSubmit}>
        <MarginBottomInput>
          <LoginEmail register={register} errors={errors} />
        </MarginBottomInput>
        <MarginBottomInput>
          <LoginPassword register={register} errors={errors} />
        </MarginBottomInput>
        <FindPasswordWrapper>
          <Link to="/password-reset">
            <FindPasswordText>비밀번호를 잊으셨나요?</FindPasswordText>
          </Link>
        </FindPasswordWrapper>
        <AuthBtn>로그인</AuthBtn>
      </AuthFormContainer>
    </>
  );
};

export default LoginForm;
