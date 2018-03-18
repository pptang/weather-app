// @flow

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line import/no-extraneous-dependencies
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: { renderPage: Function }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage();
    const styles = flush();
    return {
      html,
      head,
      errorHtml,
      chunks,
      styles,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/static/css/normalize.css" />
          <link rel="stylesheet" href="/static/css/index.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
          <link rel="stylesheet" href="/static/css/weather-icons.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
