import express from 'express';
import config from 'lazy-config';
import bodyParser from 'body-parser';
import multer from 'multer';
import expressJwt from 'express-jwt';

import logger from './logger';

// routes
import DeptRoutes from './routes/department.route';
import CategoryRoutes from './routes/category.route';
import AttributeRoutes from './routes/attribute.route';
import ProductRoutes from './routes/product.route';
import CustomerRoutes from './routes/customer.route';
import OrderRoutes from './routes/order.route';
import TaxRoutes from './routes/tax.route';
import ShippingRegionRoutes from './routes/shippingRegion.route';
import ShoppingCartRoutes from './routes/shoppingCart.route';
import SripeRoutes from './routes/stripe.route';

// utils
import apiResponse from './utils/apiResponse';
import { unprotectedRoutes } from './utils/routes';
import { authErrors } from './handlers/error.handler';
import { getToken } from './utils/auth';

const app = express();
const multerInstance = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// handle form data
app.use(multerInstance.none());

const { app: { port: PORT } } = config;

app.use(expressJwt({
  secret: config.authentication.secret,
  requestProperty: 'auth',
  getToken
}).unless({ path: unprotectedRoutes }));

app.get('/', (req, res) => apiResponse(res, 'success', { message: 'Welcome to turing!' }));
app.use('/departments', DeptRoutes);
app.use('/categories', CategoryRoutes);
app.use('/attributes', AttributeRoutes);
app.use('/products', ProductRoutes);
app.use('/customers', CustomerRoutes);
app.use('/orders', OrderRoutes);
app.use('/tax', TaxRoutes);
app.use('/shipping/regions', ShippingRegionRoutes);
app.use('/shoppingcart', ShoppingCartRoutes);
app.use('/stripe', SripeRoutes);
app.use('*', (req, res) => apiResponse(res, 'failure', 'Endpoint not found', 404));

app.use(authErrors);

app.listen(PORT, err => {
  if (err) {
    logger.error(`Error running app - ${err.message}`);
  } else {
    logger.info(`Server started on port ${PORT}`);
  }
});
