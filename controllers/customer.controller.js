import jwt from 'jsonwebtoken';
import config from 'lazy-config';

// models
import Customer from '../models/customer.model';

// utiks
import apiResponse from '../utils/apiResponse';
import { USR_05, USR_01, USR_04 } from '../utils/errorCodes';


const { secret, audience, algo } = config.authentication;
const expiresIn = '24h';
const jwtConfig = {
  expiresIn,
  algorithm: algo,
  audience,
};

const CustomerCtrl = {
  async createCustomer(req, res) {
    try {
      const { name, email, password } = req.body;

      const userInfo = { name, email, password };

      const foundUser = await Customer
        .where('email', email)
        .fetch();

      if (foundUser) {
        const msg = 'The email already exists.';
        return apiResponse(res, 'error', msg, 404, USR_04, 'email');
      }

      const newUser = await new Customer(userInfo).save();

      // eslint-disable-next-line no-unused-vars
      const { password: userPassword, ...nonSensitiveInfo } = newUser;

      return jwt.sign(
        nonSensitiveInfo, secret, jwtConfig,
        (err, token) => apiResponse(res, 'success', {
          customer: nonSensitiveInfo,
          accessToken: `Bearer ${token}`,
          expiresIn
        }));
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async signInCustomer(req, res) {
    try {
      const { email, password } = req.body;

      const foundUser = await Customer
        .where('email', email)
        .fetch();

      if (!foundUser) {
        const msg = 'The email doesn\'t exist.';
        return apiResponse(res, 'error', msg, 404, USR_05, 'email');
      }

      const isPasswordValid = await foundUser.compare(password);

      if (isPasswordValid) {
        // eslint-disable-next-line no-unused-vars
        const { password: userPassword, ...nonSensitiveInfo } = foundUser.attributes;

        return jwt.sign(
          nonSensitiveInfo, secret, jwtConfig,
          (err, token) => apiResponse(res, 'success', {
            customer: nonSensitiveInfo,
            accessToken: `Bearer ${token}`,
            expiresIn
          }));
      }

      const msg = 'Email or Password is invalid.';
      return apiResponse(res, 'error', msg, 404, USR_01, 'email');
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default CustomerCtrl;
