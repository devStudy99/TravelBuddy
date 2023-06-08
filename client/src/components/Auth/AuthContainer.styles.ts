import tw from 'tailwind-styled-components';
import { Button } from '@Common/Common.styles';

interface IsMobileProps {
  $isMobile: boolean;
}

export const AuthWrapper = tw.div`
  onlyMobile:w-full
  onlyMobile:px-24
  onlyMobile:pt-80
`;

export const AuthCard = tw.div<IsMobileProps>`
  ${({ $isMobile }) => ($isMobile ? '' : 'auth-card')}
`;

export const AuthFormContainer = tw.form`
`;

export const AuthShortCutContainer = tw.div`
  flex-center
  m-32
  text-14
  onlyMobile:text-12
  `;

export const AuthStatusText = tw.p`
  mr-24
  text-black-200
`;

export const AuthShortCutText = tw.p`
  text-black-900
`;

export const AuthBtn = tw(Button)`
  color-skyblue
  btn-size-l
  w-full
`;

export const AuthCountDown = tw.span`
  absolute
  right-10
  top-44
  text-14
  text-red-500
`;

export const LoginWrapper = tw.div<IsMobileProps>`
  ${({ $isMobile }) => ($isMobile ? '' : 'pt-80')}
  h-screen
  flex-center
  onlyMobile:login-m-align 
  bg-black-025 
  onlyMobile:bg-white
`;

export const SignupWrapper = tw.div<IsMobileProps>`
  ${({ $isMobile }) => ($isMobile ? '' : 'pt-160 pb-40')}
  h-full
  min-h-screen
  flex-center
  onlyMobile:login-m-align
  bg-black-025 
  onlyMobile:bg-white
`;
