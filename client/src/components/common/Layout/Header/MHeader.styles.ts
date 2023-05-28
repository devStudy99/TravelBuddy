import tw from 'tailwind-styled-components';

export const MHeaderContainer = tw.div`
  fixed
  z-10
  flex
  h-64
  w-[100%]
  items-center
  justify-between
  border-b
  border-black-050
  bg-white
  px-24
  py-8
  shadow-headerShadow
`;

export const LogoWrapper = tw.div`
  flex-center 
  w-150 
  cursor-pointer
`;

export const HeaderInputWrapper = tw.div`
  ml-[3.3%]
  mr-[3.3%]
  flex
  w-[100%]
  flex-col
`;

export const CloseWrapper = tw.div`
  flex-center 
  h-32
  w-32
  cursor-pointer
`;

export const MenuWrapper = tw.div`
  flex-center 
  h-32
  w-32
  cursor-pointer
`;

export const DropdownContainer = tw.div`absolute
  right-0
  top-[64px]
  flex
  w-full
  flex-col
  items-start
  justify-center
  rounded-[10px]
  border-b
  border-black-050
  bg-white
  px-24
  py-8 
  shadow-headerShadow
`;

export const DropdownList = tw.ul`
  w-full
  px-8
  text-left
`;

export const DropdownListItem = tw.li`
  flex
  h-58
  cursor-pointer
  items-center
  py-12
  text-14
`;
