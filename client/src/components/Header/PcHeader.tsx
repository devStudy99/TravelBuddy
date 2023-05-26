import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@img/logo.svg';
import InputBtn from '@components/InputBtn';
import Button from '@components/Button';

const PcHeader = () => {
  const navi = useNavigate();

  const reload = () => {
    navi('/');
    window.location.reload();
  };

  return (
    <div className="flex-center fixed z-20 w-full bg-white shadow-headerShadow">
      <div className="flex h-80 w-[100%] max-w-[1440px] items-center justify-between px-[4.5%] py-16">
        <div className="flex-center w-200 cursor-pointer" onClick={reload} role="presentation">
          <Logo />
        </div>
        <div className="input-array">
          <InputBtn placeholder="새로운 여행 동행자를 찾아보세요!" />
        </div>
        <div className="flex shrink-0 items-center justify-between">
          <Link to="/login">
            <Button className="color-skyblue btn-size-m mr-12">로그인</Button>
          </Link>
          <Link to="/signup">
            <Button className="border-gray btn-size-m">회원가입</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PcHeader;
