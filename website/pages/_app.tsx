import type { AppProps } from "next/app";
import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Head from "next/head";
import { JobTagsProvider } from "src/lib/context/jobTags/JobTagsProvider";
import { ExtensionDataProvider } from "src/lib/context/ExtensionData/ExtensionDataProvider";
import { UserProvider } from "src/lib/context/User/UserProvider";
import { LoginModalProvider } from "src/lib/context/LoginModal/LoginModalProvider";
import { LoginModal } from "src/components/Modals/variants/LoginModal";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#0a0a0a",
          padding: "16px",
        },
        arrow: {
          color: "#0a0a0a",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const AnyComponent = Component as any;
  const Provider = ThemeProvider as any;

  return (
    <>
      <Head>
        <title>Wave</title>
      </Head>
      <Provider theme={theme}>
        <SessionProvider session={session}>
          <CssBaseline />
          <UserProvider>
            <LoginModalProvider>
              <LoginModal />
              <JobTagsProvider>
                <ExtensionDataProvider>
                  <AnyComponent {...pageProps} />
                </ExtensionDataProvider>
              </JobTagsProvider>
            </LoginModalProvider>
          </UserProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}
export default MyApp;
