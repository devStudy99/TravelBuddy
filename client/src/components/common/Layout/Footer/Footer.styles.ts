import tw from 'tailwind-styled-components';

interface IsMobileProps {
  $isMobile: boolean;
}

export const FooterContainer = tw.footer`
  flex-center
  mt-0
  w-full
  bg-black-025
  `;

export const FooterWrapper = tw.div<IsMobileProps>`
  ${({ $isMobile }) => ($isMobile ? 'px-24' : 'max-w-[1440px] px-80')}
  relative
  flex
  w-[100%]
  flex-col
  py-60
`;

export const FooterLogoIconWrapper = tw.div`
  relative
  z-10 
  flex
  items-center
  justify-between
  gap-5
`;

export const FooterIconWrapper = tw.div`
  flex
  gap-6
`;

export const FooterContentWrapper = tw.div`
  mt-16
  w-[90%]
  text-12
  text-black-350
`;

export const FooterLogoNameWrapper = tw.div`
  mt-32
`;

export const FooterLogoName = tw.span`
  mr-32
`;
