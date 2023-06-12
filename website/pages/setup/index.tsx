import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import { SetupStepper } from "src/components/Stepper/SetupStepper";
import Paper from "@mui/material/Paper";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { BackgroundColor, Color } from "src/styles/color";
import { Footer } from "src/components/Footer/Footer";
import { useExtensionData } from "src/lib/extension/hooks/useExtensionData";
import { LocalStorageMetadataKeys } from "src/lib/extension/shared/userProfile";

const Step2 = () => {
  return (
    <MainPaper variant="outlined">
      <Typography align="center" variant="h6">
        <b>Download our browser extension to get started</b>
      </Typography>
      <Spacer height={32} />
      <a
        target="_blank"
        href="https://chrome.google.com/webstore/detail/uw-wave/bjpmedhmknbhefgbakephgbifiiceajm"
      >
        <PrimaryButton>Download Chrome</PrimaryButton>
      </a>
      <Spacer height={32} />
      <Typography align="center">
        By leveraging our browser extension, Wave scrapes job postings directly
        from Waterloo Works.
        <br /> Then, you can browse company information, reviews, and other
        useful features!
      </Typography>
    </MainPaper>
  );
};

const Step3 = () => {
  return (
    <MainPaper variant="outlined">
      <Typography align="center" variant="h6">
        <b>Thanks for installing! You’re almost there:</b>
      </Typography>
      <Spacer height={32} />
      <Typography align="center">
        <b>Login to WaterlooWorks</b> to begin the scraping process.
        <br />
        You’ll head back here once you’re done.
      </Typography>

      <Spacer height={32} />
      <a
        target="_blank"
        href="https://waterlooworks.uwaterloo.ca/waterloo.htm?action=login"
      >
        <PrimaryButton>Head to WaterlooWorks</PrimaryButton>
      </a>
    </MainPaper>
  );
};

const Step4 = () => {
  return (
    <MainPaper variant="outlined">
      <Typography align="center" variant="h6">
        <b>You’re all set!</b>
      </Typography>
      <Spacer height={32} />
      <PrimaryButton href="/jobs">Start Browsing Jobs</PrimaryButton>
    </MainPaper>
  );
};

const Setup = () => {
  const { extensionData, isDataReady } = useExtensionData();
  let step = 1;
  if (isDataReady) {
    step = 2;
  }
  if (extensionData && extensionData[LocalStorageMetadataKeys.SCRAPE_AT]) {
    step = 3;
  }
  const steps = [
    "Discover Wave",
    "Download Browser Extension",
    "Scrape WaterlooWorks",
  ];
  return (
    <>
      <NavigationBar />
      <Container>
        <MainWrapper>
          <Spacer height={64} />
          <Typography variant="h6">
            <b>Setup: </b>
            {`${step} / 3`}
          </Typography>
          <Spacer height={32} />
          <SetupStepper activeStep={step} steps={steps} />
          <Spacer height={32} />
        </MainWrapper>
      </Container>
      <WaterWrapper>
        <Container>
          <MainWrapper>
            <Spacer height={64} />
            {step === 1 ? <Step2 /> : null}
            {step === 2 ? <Step3 /> : null}
            {step === 3 ? <Step4 /> : null}
          </MainWrapper>
        </Container>
      </WaterWrapper>
      <Footer />
    </>
  );
};

export default Setup;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WaterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: ${BackgroundColor.darker};
  min-height: 80vh;
`;

const MainPaper = styled(Paper)`
  && {
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    background-color: ${BackgroundColor.dark};
  }

  && .MuiTypography-root {
    color: white;
  }
`;
