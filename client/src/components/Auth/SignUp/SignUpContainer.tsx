import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SignUpForm from '@SignUp/SignUpForm';
import {
  AuthCard,
  AuthWrapper,
  AuthShortCutContainer,
  AuthShortCutText,
  AuthStatusText,
  SignupWrapper,
} from '@Auth/AuthContainer.styles';

const SignUpContainer = (): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <SignupWrapper $isMobile={isMobile}>
      <AuthWrapper>
        <AuthCard $isMobile={isMobile}>
          <SignUpForm />
        </AuthCard>
        <AuthShortCutContainer>
          <AuthStatusText>이미 계정이 있으신가요?</AuthStatusText>
          <Link to="/login">
            <AuthShortCutText>로그인 바로가기</AuthShortCutText>
          </Link>
        </AuthShortCutContainer>
      </AuthWrapper>
    </SignupWrapper>
  );
};

export default SignUpContainer;
