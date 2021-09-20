import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_URL || 'null',
  tracesSampleRate: 1.0,
  releas: '0.1.0',
  enabled: process.env.NODE_ENV === 'production',
});
