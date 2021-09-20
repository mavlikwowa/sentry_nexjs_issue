/* eslint-disable react/no-danger */
import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
