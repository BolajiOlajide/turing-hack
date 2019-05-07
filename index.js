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
import { catchErrors, authErrors } from './handlers/error.handler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.secret,
  requestProperty: 'auth',
  getToken: (req) => {
    if (!('user-key' in req.headers)) {
      const tokenError = new Error('Token not found!');
      tokenError.name = 'TokenError';
      throw tokenError;
    } else if (req.headers['user-key'] && req.headers['user-key'].split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', { message: 'Welcome to turing!' }));
app.use('/departments', DeptRoutes);

app.use(catchErrors);
app.use(authErrors);

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
