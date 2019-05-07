import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';

import logger from './logger';

// routes
import DeptRoutes from './routes/department.route';

// utils
import apiResponse from './utils/apiResponse';
import { unprotectedRoutes } from './utils/routes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.secret,
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['USER-KEY'] && req.headers['USER-KEY'].split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', { message: 'Welcome to turing!' }));
app.use('/department', DeptRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return next(apiResponse(res, 'error', err.message, 401));
  }
  return next(apiResponse(res, 'error', err.message, 400));
});

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
