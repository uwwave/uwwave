import styled from "styled-components";
import Container from "@mui/material/Container";
import {
  NavBannerState,
  useNotificationBanner,
} from "src/lib/hooks/useNotificationBanner";
import Typography from "@mui/material/Typography";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { TertiaryButton } from "src/components/Buttons/TertiaryButton";

export const NotificationBanner = () => {
  const { bannerState, bannerColor, openLoginModal, gotoSetup } =
    useNotificationBanner();

  const renderBannerState = () => {
    switch (bannerState) {
      case NavBannerState.STALE_DATA:
        return (
          <>
            <WarningIcon width={24} fill="white" />
            <Typography color="white">
              Your jobs list is out of date! Re-scrape Waterloo Works with our
              extension to get the latest
            </Typography>
          </>
        );
      case NavBannerState.LOGIN:
        return (
          <>
            <Typography color="white">
              Sign in start sharing your co-op experiences and support fellow
              job-seekers on their journey.
            </Typography>
            <TertiaryButton
              text="Login"
              underline
              white
              bold
              onClick={openLoginModal}
            />
          </>
        );
      case NavBannerState.SETUP_EXTENSION:
        return (
          <>
            <Typography color="white">
              Setup our browser extension to unlock all the enhanced job hunting
              features
            </Typography>
            <TertiaryButton
              text="Setup the Extension"
              underline
              white
              bold
              onClick={gotoSetup}
            />
          </>
        );
      case NavBannerState.SCRAPE_INIT_DATA:
        return (
          <>
            <Typography color="white">
              Thanks for installing the extension! Now let’s get you setup to
              start using features
            </Typography>
            <TertiaryButton
              text="Finish Extension Setup"
              underline
              white
              bold
              onClick={gotoSetup}
            />
          </>
        );
      default:
        return null;
    }
  };

  if (bannerState === NavBannerState.EMPTY) {
    return null;
  }
  return (
    <Main bgcolor={bannerColor}>
      <MainContainer>{renderBannerState()}</MainContainer>
    </Main>
  );
};

interface IMain {
  bgcolor: string;
}
const Main = styled.div<IMain>`
  background-color: ${props => props.bgcolor};
  padding-top: 8px;
  padding-bottom: 8px;
`;
const MainContainer = styled(Container)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;
