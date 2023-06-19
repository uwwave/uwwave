import { createContext, useContext } from "react";

export interface LoginModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const LoginModalContext = createContext<
  LoginModalContextType | undefined
>(undefined);

export const useLoginModalContext = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("ExtensionDataProvider not wrapped");
  }
  return context;
};
