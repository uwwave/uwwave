import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { Spacer } from "src/components/Spacer/Spacer";
import { SetupStepper } from "src/components/Stepper/SetupStepper";
import Paper from "@mui/material/Paper";
import {
  PrimaryButton,
  PrimaryButtonWithClientLink,
} from "src/components/Buttons/PrimaryButton";
import { BackgroundColor } from "src/styles/color";
import { LocalStorageMetadataKeys } from "src/lib/extension/shared/userProfile";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { PageWrapper } from "src/components/PageWrapper/PageWrapper";
import { useEffect } from "react";

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
        <PrimaryButton>Download For Chrome</PrimaryButton>
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
      <PrimaryButtonWithClientLink href={"/jobs"}>
        Start Browsing Jobs
      </PrimaryButtonWithClientLink>
    </MainPaper>
  );
};

const Setup = () => {
  const { extensionData, isDataReady } = useExtensionsDataContext();
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
  const renderHeader = () => (
    <MainWrapper>
      <Typography variant="h6">
        <b>Setup: </b>
        {`${step} / 3`}
      </Typography>
      <Spacer height={32} />
      <SetupStepper activeStep={step} steps={steps} />
    </MainWrapper>
  );

  const renderBody = () => (
    <MainWrapper>
      {step === 1 ? <Step2 /> : null}
      {step === 2 ? <Step3 /> : null}
      {step === 3 ? <Step4 /> : null}
    </MainWrapper>
  );

  return <PageWrapper Header={renderHeader()} Body={renderBody()} />;
};

export default Setup;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
