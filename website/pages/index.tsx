import React, { useMemo } from "react";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import { UWaterlooLogo } from "src/components/icons/UWaterlooLogo";
import { BackgroundColor, Color } from "src/styles/color";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Footer } from "src/components/Footer/Footer";
import { useViewport } from "src/lib/hooks/useViewport";
import { ExtensionAnimation } from "src/components/Homepage/Animation/ExtensionAnimation";

const generatePillars = (
  pillars: number,
  minHeight: number,
  maxHeight: number
): IWavePillar[] => {
  const out: IWavePillar[] = [];
  for (let i = 0; i < pillars; i++) {
    let color: string;
    switch (i % 3) {
      case 0:
        color = Color.rating;
        break;
      case 1:
        color = Color.salary;
        break;
      default:
        color = Color.interview;
    }
    out.push({
      height: Math.random() * (maxHeight - minHeight) + minHeight,
      color,
      delay: Math.random() * 1.2,
    });
  }
  out[0].height = minHeight - 40;
  out[out.length - 1].height = minHeight;
  return out;
};

const HomePage = () => {
  const { isMobile, isViewportLoading } = useViewport();
  const pillars = useMemo(() => {
    return generatePillars(isMobile ? 12 : 24, 80, 200);
  }, [isMobile]);
  if (isViewportLoading) {
    return null;
  }

  return (
    <>
      <HeroWrapper>
        <NavigationBar />
        <Container>
          <FadeIn>
            <Spacer height={isMobile ? 142 : 32} />
            {isMobile ? (
              <MobileTitle>The Ultimate WaterlooWorks Companion</MobileTitle>
            ) : (
              <Title>
                The Ultimate <br /> WaterlooWorks Companion
              </Title>
            )}
            <Spacer height={16} />
            <SubTitleWrapper>
              {isMobile ? null : (
                <>
                  <UWaterlooLogo />
                  <Spacer width={8} />
                </>
              )}

              {isMobile ? (
                <MobileSubTitle>
                  Upgraded Search, Multi-shortlists, Interview Ratings & More
                </MobileSubTitle>
              ) : (
                <SubTitle>
                  Upgraded Search, Interview Ratings, Multi-shortlists & More
                </SubTitle>
              )}
            </SubTitleWrapper>
            <Spacer height={16} />
            {isMobile ? null : (
              <Center>
                <PrimaryButton href="/setup">Get Started</PrimaryButton>
              </Center>
            )}
            {isMobile ? null : <Spacer height={40} />}
            <Center>
              <ExtensionAnimation />
            </Center>
            <Spacer height={isMobile ? 24 : 64} />
          </FadeIn>
          <WaveDesignWrapper>
            {pillars.map((x, i) => (
              <WavePillar key={i} {...x} />
            ))}
          </WaveDesignWrapper>
        </Container>
      </HeroWrapper>
      <Footer />
    </>
  );
};

export default HomePage;

interface IWavePillar {
  height: number;
  color: string;
  delay: number;
}
const WavePillar = styled.div<IWavePillar>`
  width: 40px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation: anim 1s ease backwards;
  animation-delay: ${props => props.delay}s;

  @keyframes anim {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
const WaveDesignWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 16px;
  height: 200px;
  overflow: visible;
`;

const HeroWrapper = styled.div`
  width: 100%;
  background: ${BackgroundColor.dark};

  position: relative;
`;

const Title = styled(Typography).attrs({
  variant: "h2",
})`
  && {
    color: white;
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 4px rgba(7, 20, 30, 0.42);
  }
`;

const MobileTitle = styled(Typography).attrs({
  variant: "h4",
})`
  && {
    color: white;
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 4px rgba(7, 20, 30, 0.42);
  }
`;

const MobileSubTitle = styled(Typography).attrs({
  variant: "h6",
})`
  && {
    color: white;
    text-align: center;
  }
`;

const SubTitle = styled(Typography).attrs({
  variant: "h5",
})`
  && {
    color: white;
    text-align: center;
  }
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FadeIn = styled.div`
  animation: fadein 1s ease backwards;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
