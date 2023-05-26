import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@img/logo.svg';
import { ReactComponent as Menu } from '@img/menu.svg';
import { ReactComponent as Close } from '@img/close.svg';
import InputBtn from '@components/InputBtn';

interface MHeaderProps {
  dropDown: boolean;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const MHeader = ({ dropDown, setDropDown }: MHeaderProps) => {
  const navi = useNavigate();

  const onDropDown = () => {
    setDropDown(!dropDown);
  };

  const closeDropDown = () => {
    setDropDown(false);
  };

  const reload = () => {
    navi('/');
    window.location.reload();
  };

  return (
    <div
      className={`${
        dropDown ? '' : 'shadow-headerShadow'
      } fixed z-10 flex h-64 w-[100%] items-center justify-between border-b border-black-050 bg-white px-24 py-8`}
    >
      <div className="flex-center w-150 cursor-pointer" onClick={reload} role="presentation">
        <Logo />
      </div>
      <div className="input-array">
        <InputBtn placeholder="새로운 여행 동행자를 찾아보세요!" />
      </div>
      {dropDown ? (
        <button className="h-32 w-32" type="button" onClick={() => onDropDown()}>
          <Close />
        </button>
      ) : (
        <Menu className="h-32 w-32" onClick={() => onDropDown()} />
      )}
      {dropDown ? (
        <div className="absolute right-0 top-[64px] flex w-full flex-col items-start justify-center rounded-[10px] border-b border-black-050 bg-white px-24 py-8 shadow-headerShadow">
          <ul className="w-full px-8 text-left">
            <Link to="/login">
              <li
                className="flex h-58 cursor-pointer items-center py-12 text-14"
                onClick={() => closeDropDown()}
                role="presentation"
              >
                로그인
              </li>
            </Link>
            <Link to="/signup">
              <li
                className="flex h-58 cursor-pointer items-center py-12 text-14"
                onClick={() => closeDropDown()}
                role="presentation"
              >
                회원가입
              </li>
            </Link>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MHeader;
