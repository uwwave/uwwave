import styled from "styled-components";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import Container from "@mui/material/Container";
import { BackgroundColor } from "src/styles/color";
import { Spacer } from "src/components/Spacer/Spacer";
import { Footer } from "src/components/Footer/Footer";
import Paper from "@mui/material/Paper";

interface IPageWrapper {
  Header: React.ReactNode;
  Body: React.ReactNode;
  BeforeFooter?: React.ReactNode;
  headerPadding?: number;
  hideBackground?: boolean;
  lighterBackground?: boolean;
}
export const PageWrapper = ({
  headerPadding,
  Header,
  Body,
  BeforeFooter,
  hideBackground,
  lighterBackground,
}: IPageWrapper) => {
  return (
    <Main>
      <NavigationBar backgroundColor="white" />
      <Container>
        <Spacer height={64} />
        <StyledPaper
          elevation={0}
          padding={headerPadding ?? 32}
          hidebg={(hideBackground ?? false).toString()}
        >
          {Header}
          <Spacer height={16} />
        </StyledPaper>
      </Container>
      <Shadow />
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
`;

interface IMain {
  padding: number;
  hidebg: string;
}

const StyledPaper = styled(Paper)<IMain>`
  && {
    padding: ${props => props.padding}px;
    background-color: ${props =>
      props.hidebg === "true" ? "rgba(0, 0, 0, 0)" : "white"};
  }
`;

const Shadow = styled.div`
  margin-top: -24px;
  z-index: 1;
  position: relative;
  height: 8px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 21.88%,
    rgba(139, 139, 139, 0.88) 100%
  );
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
