import { BaseModal } from "src/components/Modals/BaseModal";
import styled from "styled-components";
import { Spacer } from "src/components/Spacer/Spacer";
import { RoundedTextField } from "src/components/TextField/RoundedTextField";
import { TertiaryButton } from "src/components/Buttons/TertiaryButton";
import { PrimaryButton } from "src/components/Buttons/PrimaryButton";
import { Typography } from "@mui/material";
import { GoogleIcon } from "src/components/icons/logo/Google";
import { ContinueWithGoogleButton } from "src/components/Buttons/ContinueWithGoogle";
import { signIn } from "next-auth/react";
import { LoginModalState, useLoginModal } from "src/lib/hooks/useLoginModal";
import React from "react";
import { Color } from "src/styles/color";
import { LogoLoader } from "src/components/Loader/LogoLoader";

export const LoginModal = () => {
  const {
    isOpen,
    close,
    modalState,
    setModalState,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorMessage,
    isConfirmPasswordError,
    isCreateAccountButtonDisabled,
    onCreateAccount,
    email,
    setEmail,
    username,
    setUsername,
    isUsernameError,
    handleSignIn,
    loginError,
    isLoginButtonDisabled,
    modalTitle,
  } = useLoginModal();

  const renderLoginState = () => (
    <>
      <form onSubmit={handleSignIn}>
        <RoundedTextField
          error={!!loginError}
          onSubmit={handleSignIn}
          placeholder="Email"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <Spacer height={8} />
        <RoundedTextField
          error={!!loginError}
          onSubmit={handleSignIn}
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        {loginError ? (
          <>
            <Spacer height={8} />
            <Typography color="red" align="center">
              {loginError}
            </Typography>
          </>
        ) : null}
        <Spacer height={8} />
        <TertAlign>
          <TertiaryButton text="Forgot Password?" />
        </TertAlign>
        <Spacer height={16} />
        <Center>
          <PrimaryButton type="submit" disabled={isLoginButtonDisabled}>
            {modalState === LoginModalState.LOGIN_LOADING ? (
              <LogoLoader darkMode width={48} />
            ) : (
              "Login"
            )}
          </PrimaryButton>
        </Center>
      </form>
      <Spacer height={32} />
      <Center>
        <TertiaryButton
          text="Create an account"
          onClick={() => {
            setModalState(LoginModalState.CREATE_ACCOUNT);
          }}
        />
      </Center>
    </>
  );

  const renderCreateAccountState = () => (
    <>
      <RoundedTextField
        error={isUsernameError}
        placeholder="Username"
        required
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
      />
      <Spacer height={8} />
      <RoundedTextField
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        required
      />
      <Spacer height={8} />
      <RoundedTextField
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <Spacer height={8} />
      <RoundedTextField
        error={isConfirmPasswordError}
        placeholder="Confirm Password"
        type="password"
        required
        value={confirmPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <Spacer height={16} />
      {errorMessage ? (
        <Typography color="red" align="center">
          {errorMessage}
        </Typography>
      ) : null}
      <Spacer height={32} />
      <Center>
        {
          <PrimaryButton
            disabled={isCreateAccountButtonDisabled}
            onClick={onCreateAccount}
          >
            {modalState === LoginModalState.CREATE_ACCOUNT_LOADING ? (
              <LogoLoader darkMode width={48} />
            ) : (
              "Create Account"
            )}
          </PrimaryButton>
        }
      </Center>
      <Spacer height={16} />
      <Center>
        <TertiaryButton
          text="Already have an account? Sign in"
          onClick={() => {
            setModalState(LoginModalState.LOGIN);
          }}
        />
      </Center>
    </>
  );

  const renderModalState = () => {
    switch (modalState) {
      case LoginModalState.CREATE_ACCOUNT:
      case LoginModalState.CREATE_ACCOUNT_LOADING:
        return renderCreateAccountState();
      default:
        return renderLoginState();
    }
  };

  const renderVerifyEmailBanner = () => {
    return (
      <VerifyEmailBanner>
        <Typography color="white" align="center">
          Verification Email sent! Please check your inbox
        </Typography>
      </VerifyEmailBanner>
    );
  };
  return (
    <BaseModal
      open={isOpen}
      hasCloseX
      title={modalTitle}
      onCloseModal={close}
      maxWidth="xs"
      dark
      header={
        modalState === LoginModalState.EMAIL_SENT
          ? renderVerifyEmailBanner()
          : undefined
      }
    >
      {renderModalState()}
      <Spacer height={32} />
      <Center>
        <Divider />
      </Center>
      <Spacer height={32} />
      <ContinueWithGoogleButton onClick={() => signIn("google")}>
        <GoogleIcon width={32} />
        <Typography flex="1">Continue with Google</Typography>
      </ContinueWithGoogleButton>
    </BaseModal>
  );
};

const TertAlign = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Divider = styled.div`
  background-color: white;
  width: 76%;
  height: 1px;
`;

const VerifyEmailBanner = styled.div`
  padding: 16px;
  background-color: ${Color.green};
`;
