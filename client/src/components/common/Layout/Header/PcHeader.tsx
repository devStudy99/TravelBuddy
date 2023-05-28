import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@img/logo.svg';
import {
  PcHeaderContainer,
  HeaderContent,
  LogoWrapper,
  HeaderInputWrapper,
  AuthBtnContainer,
  LoginBtn,
  SignBtn,
} from '@Header/PcHeader.styles';
import HeaderInput from '@components/common/Input/SearchInput';

const PcHeader = () => {
  const navi = useNavigate();

  const reload = () => {
    navi('/');
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
