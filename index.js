import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
// import expressJwt from 'express-jwt';

import logger from './logger';

// routes
import DeptRoutes from './routes/department.route';
import CategoryRoutes from './routes/category.route';

// utils
import apiResponse from './utils/apiResponse';
// import { unprotectedRoutes } from './utils/routes';
import { catchErrors, authErrors } from './handlers/error.handler';
// import { getToken } from './utils/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { app: { port: PORT } } = config;

// app.use(expressJwt({
//   secret: config.authentication.secret,
//   requestProperty: 'auth',
//   getToken
// }).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', { message: 'Welcome to turing!' }));
app.use('/departments', DeptRoutes);
app.use('/categories', CategoryRoutes);
app.use('*', (req, res) => apiResponse(res, 'failure', 'Route doesn\'t exist', 404));

app.use(authErrors);

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
