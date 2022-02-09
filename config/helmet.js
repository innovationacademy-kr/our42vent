const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      connectSrc: ["'self'", 'https://*.sentry.io/api/', 'https://www.google-analytics.com/'],
      scriptSrc: [
        "'self'",
        'https://cdn.jsdelivr.net/',
        'https://browser.sentry-cdn.com/',
        'https://www.googletagmanager.com/gtag/',
        'https://www.google-analytics.com/',
      ],
      imgSrc: ["'self'", 'https://cdn.intra.42.fr/', 'https://www.google-analytics.com/'],
      frameSrc: ["'self'", 'https://browser.sentry-cdn.com'],
    },
  },
  crossOriginEmbedderPolicy: false,
};

export default helmetConfig;
