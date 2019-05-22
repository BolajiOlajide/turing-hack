import jwt from 'jsonwebtoken';
import config from 'lazy-config';

// models
import Customer from '../models/customer.model';

// utiks
import apiResponse from '../utils/apiResponse';


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
  }
};

export default CustomerCtrl;
