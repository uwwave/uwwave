import { useEffect, useMemo } from "react";
import { useExtensionsDataContext } from "src/lib/context/ExtensionData/ExtensionDataContext";
import { Color } from "src/styles/color";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { useRouter } from "next/router";
import { useUserStateContext } from "../context/UserState/UserStateContext";

export enum NavBannerState {
  EMPTY,
  SETUP_EXTENSION,
  SCRAPE_INIT_DATA,
  STALE_DATA,
  LOGIN,
}

export const useNotificationBanner = () => {
  const { fetchExtensionData } = useExtensionsDataContext();
  const { open } = useLoginModalContext();
  useEffect(() => {
    fetchExtensionData();
  }, []);
  const router = useRouter();
  const { bannerState } = useUserStateContext();

  const bannerColor: string = useMemo(() => {
    switch (bannerState) {
      case NavBannerState.STALE_DATA:
        return Color.yellow;
      default:
        return Color.primaryButton;
    }
  }, [bannerState]);

  const gotoSetup = () => {
    router.push("/setup");
  };
  return {
    bannerState,
    bannerColor,
    openLoginModal: open,
    gotoSetup,
  };
};
