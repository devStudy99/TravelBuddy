import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@img/logo.svg';
import { ReactComponent as Close } from '@img/close.svg';
import { ReactComponent as Menu } from '@img/menu.svg';
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
import SearchInput from '@components/common/Input/SearchInput';

const MHeader = () => {
  const [dropDown, setDropDown] = useState(false);
  const navi = useNavigate();

  const onDropDown = () => setDropDown(!dropDown);
  const reload = () => {
    navi('/');
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
