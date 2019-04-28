import dotenv from 'dotenv';
import { getEnvVar } from 'env-utils';


dotenv.config();

const lazyGetEnvVar = (...args) => () => getEnvVar(...args);

module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',

  app: {
    port: lazyGetEnvVar('PORT', { devDefault: '8081', optional: true }),
  },

  authentication: {
    jwtSecret: lazyGetEnvVar('JWT_SECRET', { devDefault: 'loochloosa' }),
  },

  db: {
    host: lazyGetEnvVar('DB_HOST', { devDefault: '127.0.0.1' }),
    name: lazyGetEnvVar('DB_NAME'),
    password: lazyGetEnvVar('DB_PASSWORD'),
    user: lazyGetEnvVar('DB_USER'),
  }
};
