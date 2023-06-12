import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import { ServerStyleSheet } from "styled-components";

function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {this.props.emotionStyleTags}
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const styledComponentsSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App =>
          function EnhanceApp(props) {
            return styledComponentsSheet.collectStyles(
              <App emotionCache={cache} {...props} />
            );
          },
      });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentsSheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    styledComponentsSheet.seal();
  }
};
