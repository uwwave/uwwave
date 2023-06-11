import type { AppProps } from "next/app";
import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "san-serif"].join(","),
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

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const AnyComponent = Component as any;
  const Provider = ThemeProvider as any;

  return (
    <Provider theme={theme}>
      <CssBaseline />
      <AnyComponent {...pageProps} />
    </Provider>
  );
}
export default MyApp;
