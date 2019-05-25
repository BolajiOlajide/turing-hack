const dotenv = require('dotenv');
const { getEnvVar } = require('env-utils');


dotenv.config();

const lazyGetEnvVar = (...args) => () => getEnvVar(...args);

module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isStaging: () => process.env.NODE_ENV === 'staging',
  isProd: () => process.env.NODE_ENV === 'production',

  app: {
    port: lazyGetEnvVar('PORT', { devDefault: '8081', optional: true }),
  },

  authentication: {
    secret: lazyGetEnvVar('JWT_SECRET', { devDefault: 'turing' }),
    audience: lazyGetEnvVar('JWT_AUDIENCE', { devDefault: 'turing' }),
    algo: lazyGetEnvVar('JWT_ALGO', { devDefault: 'HS512' }),
  },

  db: {
    host: lazyGetEnvVar('DB_HOST', { devDefault: '127.0.0.1' }),
    name: lazyGetEnvVar('DB_NAME'),
    password: lazyGetEnvVar('DB_PASSWORD'),
    user: lazyGetEnvVar('DB_USER'),
  },

  facebook: {
    appId: lazyGetEnvVar('FACEBOOK_APP_ID'),
    appSecret: lazyGetEnvVar('FACEBOOK_APP_SECRET'),
  },

  stripe: {
    token: lazyGetEnvVar('STRIPE_TOKEN')
  }
};
