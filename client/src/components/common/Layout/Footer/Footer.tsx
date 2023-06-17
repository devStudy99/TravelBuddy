import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Figma } from '@image/figma.svg';
import { ReactComponent as GitHub } from '@image/github.svg';
import { ReactComponent as Logo } from '@image/logo.svg';
import {
  FooterContainer,
  FooterContentWrapper,
  FooterIconWrapper,
  FooterLogoIconWrapper,
  FooterLogoName,
  FooterLogoNameWrapper,
  FooterWrapper,
} from '@Footer/Footer.styles';

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <FooterContainer>
      <FooterWrapper $isMobile={isMobile}>
        <FooterLogoIconWrapper>
          <Logo className="w-230" />
          <FooterIconWrapper>
            <a
              href="https://www.figma.com/file/RuSC6C98EoSfXTkG2bGR2V/TravelBuddy?type=design&node-id=0-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Figma />
            </a>
            <a
              href="https://github.com/devStudy99/TravelBuddy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </a>
          </FooterIconWrapper>
        </FooterLogoIconWrapper>
        <FooterContentWrapper>
          <p>
            상호명: 트래블버디 | 대표: 김승현 | 사업자번호: 123-45-67890 | 통신판매업신고번호:
            2023-트래블-12345 | <br />
            대표번호: 1234-5678 | 주소: 서울특별시 강남구 코딩동 코딩로 123, 1층 101호 | <br />
            문의: contact@travelbuddy.com | 운영시간: 평일 09:00 - 18:00 (공휴일 휴무)
          </p>
          <FooterLogoNameWrapper>
            <FooterLogoName>© Travel Buddy</FooterLogoName>
            <span>김승현</span>
          </FooterLogoNameWrapper>
        </FooterContentWrapper>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
