import { createContext, useContext } from "react";
import { NavBannerState } from "src/lib/hooks/useNotificationBanner";

export interface UserStateContextType {
  bannerState: NavBannerState;
}

export const UserStateContext = createContext<UserStateContextType | undefined>(
  undefined
);

export const useUserStateContext = () => {
  const userContext = useContext(UserStateContext);
  if (!userContext) {
    throw new Error("UsetStaterovider not wrapped");
  }
  return userContext;
};
