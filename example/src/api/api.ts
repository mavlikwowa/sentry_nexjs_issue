/* eslint-disable no-throw-literal */
/** библиотеки */
import fetch from 'isomorphic-unfetch';
import https from 'https';
import Cookies, { CookieChangeOptions } from 'universal-cookie';

import * as Sentry from '@sentry/nextjs';

const handler = async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
};

export default Sentry.withSentry(handler);
