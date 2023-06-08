import { Button } from '@Common/Common.styles';
import tw from 'tailwind-styled-components';

export const InputWithBtnWraaper = tw.div`
  mb-24  
  flex
  items-end
`;

interface VerifyBtnProps {
  $isError: boolean;
  $isAuthenticated?: boolean;
}

export const VerifyBtn = tw(Button)<VerifyBtnProps>`
  ${({ $isError }) => ($isError ? 'mb-26' : '')}
  ${({ $isAuthenticated }) => ($isAuthenticated ? 'bg-gray-200 cursor-default' : 'color-skyblue')}
  w-120
  btn-size-l
  ml-8
  shrink-0
`;
