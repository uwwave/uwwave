import { createContext, useContext } from "react";
import { IUserData } from "src/database/models/UserData";

export interface UserContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  user?: IUserData;
  refetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("ExtensionDataProvider not wrapped");
  }
  return userContext;
};
