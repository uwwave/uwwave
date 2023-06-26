import styled from "styled-components";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import Container from "@mui/material/Container";
import { BackgroundColor } from "src/styles/color";
import { Spacer } from "src/components/Spacer/Spacer";
import { Footer } from "src/components/Footer/Footer";
import Paper from "@mui/material/Paper";
import { IMobile } from "src/lib/types/mobile";
import { useViewport } from "src/lib/hooks/useViewport";

interface IPageWrapper {
  HeaderComponents: React.ReactNode[];
  Body: React.ReactNode;
  BeforeFooter?: React.ReactNode;
  headerPadding?: number;
  hideBackground?: boolean;
  lighterBackground?: boolean;
}
export const PageWrapper = ({
  HeaderComponents,
  Body,
  BeforeFooter,
  lighterBackground,
}: IPageWrapper) => {
  const { isMobile } = useViewport();
  return (
    <Main>
      <NavigationBar />
      <Container>
        <Spacer height={isMobile ? 128 : 64} />
        {HeaderComponents.map((x, i) => {
          if (x === null) {
            return;
          }
          return (
            <div key={i}>
              <StyledPaper elevation={0} isMobile={isMobile}>
                {x}
              </StyledPaper>
              {i < HeaderComponents.length - 1 ? <Spacer height={4} /> : null}
            </div>
          );
        })}
      </Container>
      <WaterWrapper lighter={lighterBackground ?? false}>
        <Spacer height={32} />
        <Container>{Body}</Container>
        <Spacer height={128} />
      </WaterWrapper>
      {BeforeFooter}
      <Footer dark={lighterBackground} />
    </Main>
  );
};

const Main = styled.div`
  background-color: ${BackgroundColor.offWhite};
  overflow: hidden;
`;

const StyledPaper = styled(Paper)<IMobile>`
  && {
    padding: ${props => (props.isMobile ? 8 : 32)}px;
  }
`;

interface IWaterWrapper {
  lighter: boolean;
}
const WaterWrapper = styled.div<IWaterWrapper>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: ${props =>
    props.lighter ? BackgroundColor.dark : BackgroundColor.darker};
  min-height: 100vh;
  z-index: 1;
  position: relative;
`;
