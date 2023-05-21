import type { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {

  const AnyComponent = Component as any;

  return (
        <AnyComponent {...pageProps} />
  );
}
export default MyApp;
