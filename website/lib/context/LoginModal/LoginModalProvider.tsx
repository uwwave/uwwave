import React, { useState } from "react";
import {
  LoginModalContextType,
  LoginModalContext,
} from "src/lib/context/LoginModal/LoginModalContext";
import { IProvider } from "src/lib/context/shared";

export const LoginModalProvider = ({ children }: IProvider) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };
  const value: LoginModalContextType = {
    isOpen,
    close,
    open,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
};
