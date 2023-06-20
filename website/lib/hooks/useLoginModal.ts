import { signIn } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useLoginModalContext } from "src/lib/context/LoginModal/LoginModalContext";
import { Requests } from "src/lib/requests/Requests";
import { CreateAccountErrorType } from "src/lib/types/users";
export enum LoginModalState {
  LOGIN,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_LOADING,
  EMAIL_SENT,
  LOGIN_LOADING,
}

export const useLoginModal = () => {
  const { isOpen, close: closeState } = useLoginModalContext();
  const [modalState, setModalState] = useState<LoginModalState>(
    LoginModalState.LOGIN
  );
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errorType, setErrorType] = useState<CreateAccountErrorType>(
    CreateAccountErrorType.NONE
  );
  const [loginError, setLoginError] = useState<string>();

  useEffect(() => {
    const isChangePasswordError =
      password && confirmPassword && password !== confirmPassword;
    setErrorType(
      isChangePasswordError
        ? CreateAccountErrorType.PASSWORD_DONT_MATCH
        : CreateAccountErrorType.NONE
    );
  }, [password, confirmPassword]);

  const close = () => {
    closeState();
    setModalState(LoginModalState.LOGIN);
  };

  const onCreateAccount = () => {
    if (!email || !username || !password) {
      return;
    }
    setModalState(LoginModalState.CREATE_ACCOUNT_LOADING);
    setErrorType(CreateAccountErrorType.NONE);
    Requests.createAccount(email, username, password)
      .then(() => {
        setErrorType(CreateAccountErrorType.NONE);
        setModalState(LoginModalState.EMAIL_SENT);
      })
      .catch(x => {
        setErrorType(x.response.data);
        setModalState(LoginModalState.CREATE_ACCOUNT);
      });
  };

  const isConfirmPasswordError =
    errorType === CreateAccountErrorType.PASSWORD_DONT_MATCH;
  const isCreateAccountButtonDisabled =
    isConfirmPasswordError ||
    !password ||
    !confirmPassword ||
    !username ||
    !email ||
    modalState === LoginModalState.CREATE_ACCOUNT_LOADING;
  const isUsernameError =
    errorType === CreateAccountErrorType.USERNAME_EXISTS ||
    errorType === CreateAccountErrorType.BAD_USERNAME;
  const isLoginButtonDisabled = modalState === LoginModalState.LOGIN_LOADING;
  const errorMessage = useMemo(() => {
    switch (errorType) {
      case CreateAccountErrorType.PASSWORD_DONT_MATCH:
        return "Passwords do not match";
      case CreateAccountErrorType.USERNAME_EXISTS:
        return "Username is taken";
      case CreateAccountErrorType.BAD_USERNAME:
        return "Username: 3-20 characters, letters & numbers only.";
      case CreateAccountErrorType.WEAK_PASSWORD:
        return "Password is too weak";
      case CreateAccountErrorType.EMAIL_IN_USE:
        return "Email already in use";
      case CreateAccountErrorType.EMAIL_INVALID:
        return "Email is invalid";
      case CreateAccountErrorType.ERROR:
        return "Something went wrong";
      default:
        return "";
    }
  }, [errorType]);
  const modalTitle: string = useMemo(() => {
    switch (modalState) {
      case LoginModalState.CREATE_ACCOUNT:
      case LoginModalState.CREATE_ACCOUNT_LOADING:
        return "Create Account";
      default:
        return "Login";
    }
  }, [modalState]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalState(LoginModalState.LOGIN_LOADING);
    setLoginError(undefined);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result?.ok) {
      console.log(result);
      // Handle sign-in error
      if (result?.error !== "user/unverified") {
        setLoginError("Oops! We couldn't sign you in");
        setModalState(LoginModalState.LOGIN);
      } else {
        setModalState(LoginModalState.EMAIL_SENT);
      }
    } else {
      setLoginError(undefined);
      setModalState(LoginModalState.LOGIN);
      close();
    }
  };

  return {
    handleSignIn,
    onCreateAccount,
    isCreateAccountButtonDisabled,
    isOpen,
    close,
    modalState,
    setModalState,
    errorMessage,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isConfirmPasswordError,
    username,
    setUsername,
    email,
    setEmail,
    isUsernameError,
    loginError,
    isLoginButtonDisabled,
    modalTitle,
  };
};
