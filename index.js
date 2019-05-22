import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import multer from 'multer';
// import expressJwt from 'express-jwt';

import logger from './logger';

// routes
import DeptRoutes from './routes/department.route';
import CategoryRoutes from './routes/category.route';
import AttributeRoutes from './routes/attribute.route';
import ProductRoutes from './routes/product.route';

// utils
import apiResponse from './utils/apiResponse';
// import { unprotectedRoutes } from './utils/routes';
import { authErrors } from './handlers/error.handler';
// import { getToken } from './utils/auth';

const app = express();
const multerInstance = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// handle form data
app.use(multerInstance.none());

const { app: { port: PORT } } = config;

// app.use(expressJwt({
//   secret: config.authentication.secret,
//   requestProperty: 'auth',
//   getToken
// }).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', { message: 'Welcome to turing!' }));
app.use('/departments', DeptRoutes);
app.use('/categories', CategoryRoutes);
app.use('/attributes', AttributeRoutes);
app.use('/products', ProductRoutes);
app.use('*', (req, res) => apiResponse(res, 'failure', 'Endpoint not found', 404));

app.use(authErrors);

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
