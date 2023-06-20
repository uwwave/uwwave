import React, { useMemo } from "react";
import {
  UserStateContextType,
  UserStateContext,
} from "src/lib/context/UserState/UserStateContext";
import { IProvider } from "src/lib/context/shared";
import { useRouter } from "next/router";
import { LocalStorageMetadataKeys } from "src/lib/extension/shared/userProfile";
import { NavBannerState } from "src/lib/hooks/useNotificationBanner";
import { useExtensionsDataContext } from "../ExtensionData/ExtensionDataContext";
import { useUserContext } from "../User/UserContext";

export const UserStateProvider = ({ children }: IProvider) => {
  const { extensionData, isDataReady, isStale } = useExtensionsDataContext();
  const { user } = useUserContext();
  const router = useRouter();

  const bannerState: NavBannerState = useMemo(() => {
    let out = NavBannerState.EMPTY;
    if (router.pathname !== "/setup") {
      out = NavBannerState.SETUP_EXTENSION;
      if (isDataReady) {
        out = NavBannerState.SCRAPE_INIT_DATA;
      } else {
        return out;
      }
    }
    if (extensionData && extensionData[LocalStorageMetadataKeys.SCRAPE_AT]) {
      out = NavBannerState.STALE_DATA;
    } else {
      return out;
    }
    if (!isStale) {
      out = NavBannerState.LOGIN;
    } else {
      return out;
    }
    if (user) {
      out = NavBannerState.EMPTY;
    }
    return out;
  }, [isDataReady, extensionData, user, isStale, router.pathname]);
  const value: UserStateContextType = {
    bannerState,
  };

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
};
