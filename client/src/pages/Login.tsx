import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LoginForm from '@Login/LoginForm';
import {
  AuthCard,
  AuthWrapper,
  AuthShortCutContainer,
  AuthShortCutText,
  AuthStatusText,
  LoginWrapper,
} from '@Auth/AuthContainer.styles';

export const Login = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <LoginWrapper $isMobile={isMobile}>
      <AuthWrapper>
        <AuthCard $isMobile={isMobile}>
          <LoginForm />
        </AuthCard>
        <AuthShortCutContainer>
          <AuthStatusText>아직 트래블버디 회원이 아니신가요?</AuthStatusText>
          <Link to="/signup">
            <AuthShortCutText>회원가입 바로가기</AuthShortCutText>
          </Link>
        </AuthShortCutContainer>
      </AuthWrapper>
    </LoginWrapper>
  );
};
