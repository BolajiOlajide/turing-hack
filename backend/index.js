import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import boom from 'boom';

import logger from './logger';
// import db from './db';
import apiResponse from './utils/apiResponse';
import { unprotectedRoutes } from './utils/routes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { isDev, app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.jwtSecret,
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['USER-KEY'] && req.headers['USER-KEY'].split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', 'Sample express application'));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return next(apiResponse(res, 'error', err.message, 401));
  }
});

if (isDev) {
  /* eslint-disable global-require */
  app.use(require('koii'));
  /* eslint-enable */
}

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
