/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');

const { withSentryConfig } = require('@sentry/nextjs');

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
const settings = require('./settings.json');
const settingsStaging = require('./settings.Staging.json');
const settingsDev = require('./settings.Development.json');

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(() => {
  const isProd = process.env.NODE_ENV === 'production';
  const isStaging = process.env.NODE_ENV === 'staging';
  const isDev =
    process.env.NODE_ENV === 'development' || !(isProd || isStaging);

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const actualSettings = isProd
    ? settings
    : isStaging
    ? settingsStaging
    : isDev
    ? settingsDev
    : null;

  const env = {
    API_URL: (() => {
      if (actualSettings)
        return process.env.API_URL ? process.env.API_URL : actualSettings.api;
      return 'API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    API_INTERNAL_URL: (() => {
      if (actualSettings)
        return process.env.API_INTERNAL_URL
          ? process.env.API_INTERNAL_URL
          : actualSettings.apiInternal;
    })(),
    API_CHAT: (() => {
      if (actualSettings)
        return process.env.API_CHAT
          ? process.env.API_CHAT
          : actualSettings.chat.api;
      return 'API_CHAT:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    CHAT_JS: (() => {
      if (actualSettings)
        return process.env.CHAT_JS
          ? process.env.CHAT_JS
          : actualSettings.chat.js;
      return 'CHAT_JS:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    CHAT_TOKEN: (() => {
      if (actualSettings)
        return process.env.CHAT_TOKEN
          ? process.env.CHAT_TOKEN
          : actualSettings.chat.token;
      return 'CHAT_TOKEN:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    CHAT_CHANNEL_ID: (() => {
      if (actualSettings)
        return process.env.CHAT_CHANNEL_ID
          ? process.env.CHAT_CHANNEL_ID
          : actualSettings.chat.channelId;
      return 'CHAT_CHANNEL_ID:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    STATIC_SERVER: (() => {
      if (actualSettings)
        return process.env.STATIC_SERVER
          ? process.env.STATIC_SERVER
          : actualSettings.staticServer || '';
      return '';
    })(),
    REVALIDATE_STATIC_PERIOD: (() => {
      if (actualSettings)
        return process.env.REVALIDATE_STATIC_PERIOD
          ? process.env.REVALIDATE_STATIC_PERIOD
          : actualSettings.revalidateStaticPeriod;
    })(),
    PREVIEW_SECRET: (() => {
      if (actualSettings)
        return process.env.PREVIEW_SECRET
          ? process.env.PREVIEW_SECRET
          : actualSettings.previewSecret;
    })(),
    SENTRY_URL: (() => {
      if (actualSettings)
        return process.env.SENTRY_URL
          ? process.env.SENTRY_URL
          : actualSettings.sentryUrl;
    })(),
    IS_DEV: isDev,
    IS_PROD: isProd,
  };

  return {
    webpack: (config, { isServer }) => {
      config.resolve.alias['~'] = path.resolve('./src');
      config.resolve.alias['react'] = path.resolve('./node_modules/react');
      if (!isServer) config.node = { fs: 'empty' };
      return config;
    },
    env,
  };
}, SentryWebpackPluginOptions);
