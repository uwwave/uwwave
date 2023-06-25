import styled from "styled-components";
import Container from "@mui/material/Container";
import {
  NavBannerState,
  useNotificationBanner,
} from "src/lib/hooks/useNotificationBanner";
import Typography from "@mui/material/Typography";
import { WarningIcon } from "src/components/icons/WarningIcon";
import { TertiaryButton } from "src/components/Buttons/TertiaryButton";
import { Color } from "src/styles/color";
import { isMobile as isMobileDevice } from "react-device-detect";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const NotificationBanner = () => {
  const { bannerState, bannerColor, openLoginModal, gotoSetup } =
    useNotificationBanner();
  const [mobileBannerOpen, setMobileBannerOpen] = useState(true);

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

  const renderMobileBanner = () => {
    if (!mobileBannerOpen) {
      return null;
    }
    return (
      <MobileMain bgcolor={Color.primaryButton}>
        <MobileContainer>
          <Typography color="white">
            Unlock all features on Desktop Browser
          </Typography>
          <IconButton
            onClick={() => {
              setMobileBannerOpen(false);
            }}
          >
            <StyledCloseIcon />
          </IconButton>
        </MobileContainer>
      </MobileMain>
    );
  };

  if (isMobileDevice) {
    return renderMobileBanner();
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

const MobileContainer = styled(Container)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const MobileMain = styled.div<IMain>`
  background-color: ${props => props.bgcolor};
  padding-top: 4px;
  padding-bottom: 4px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  && {
    color: white;
  }
`;
