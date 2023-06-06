import { Button } from '@Common/Common.styles';
import tw from 'tailwind-styled-components';

export const PcHeaderContainer = tw.div`
  flex-center
  fixed
  z-20
  w-full
  bg-white
  shadow-headerShadow
`;

export const HeaderContent = tw.div`
  flex
  h-80
  w-[100%]
  max-w-[1440px]
  items-center
  justify-between
  px-[4.5%]
  py-16
`;

export const LogoWrapper = tw.div`
  flex-center 
  w-200 
  cursor-pointer
`;

export const HeaderInputWrapper = tw.div`
  ml-[3.3%]
  mr-[3.3%]
  flex
  w-[100%]
  flex-col
`;

export const AuthBtnContainer = tw.div`
  flex
  shrink-0
  items-center
  justify-between
  gap-4
`;

export const LoginBtn = tw(Button)`
  color-skyblue
  btn-size-m
`;

export const SignBtn = tw(Button)`
  border-gray
  btn-size-m
`;
