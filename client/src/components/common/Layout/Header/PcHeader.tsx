import { Link, useNavigate } from 'react-router-dom';
import HeaderInput from '@Input/SearchInput';
import {
  PcHeaderContainer,
  HeaderContent,
  LogoWrapper,
  HeaderInputWrapper,
  AuthBtnContainer,
  LoginBtn,
  SignBtn,
} from '@Header/PcHeader.styles';
import { ReactComponent as Logo } from '@image/logo.svg';

const PcHeader = (): JSX.Element => {
  const navigate = useNavigate();

  const reload = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <PcHeaderContainer>
      <HeaderContent>
        <LogoWrapper>
          <Logo onClick={reload} />
        </LogoWrapper>
        <HeaderInputWrapper>
          <HeaderInput />
        </HeaderInputWrapper>
        <AuthBtnContainer>
          <Link to="/login">
            <LoginBtn>로그인</LoginBtn>
          </Link>
          <Link to="/signup">
            <SignBtn>회원가입</SignBtn>
          </Link>
        </AuthBtnContainer>
      </HeaderContent>
    </PcHeaderContainer>
  );
};

export default PcHeader;
