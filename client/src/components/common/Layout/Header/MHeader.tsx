import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from '@Input/SearchInput';
import {
  MHeaderContainer,
  LogoWrapper,
  HeaderInputWrapper,
  CloseWrapper,
  MenuWrapper,
  DropdownContainer,
  DropdownList,
  DropdownListItem,
} from '@Header/MHeader.styles';
import { ReactComponent as Logo } from '@image/logo.svg';
import { ReactComponent as Close } from '@image/close.svg';
import { ReactComponent as Menu } from '@image/menu.svg';

const MHeader = (): JSX.Element => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const navigate = useNavigate();

  const onDropDown = () => setDropDown(!dropDown);
  const reload = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <MHeaderContainer>
      <LogoWrapper onClick={reload}>
        <Logo />
      </LogoWrapper>
      <HeaderInputWrapper>
        <SearchInput />
      </HeaderInputWrapper>
      {dropDown ? (
        <>
          <CloseWrapper onClick={onDropDown}>
            <Close />
          </CloseWrapper>
          <DropdownContainer>
            <DropdownList>
              <Link to="/login">
                <DropdownListItem onClick={onDropDown}>로그인</DropdownListItem>
              </Link>
              <Link to="/signup">
                <DropdownListItem onClick={onDropDown}>회원가입</DropdownListItem>
              </Link>
            </DropdownList>
          </DropdownContainer>
        </>
      ) : (
        <MenuWrapper onClick={onDropDown}>
          <Menu />
        </MenuWrapper>
      )}
    </MHeaderContainer>
  );
};

export default MHeader;
