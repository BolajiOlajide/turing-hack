import jwt from 'jsonwebtoken';
import config from 'lazy-config';
import axios from 'axios';

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

      const customer = await new Customer(userInfo).save();

      return jwt.sign(
        customer, secret, jwtConfig,
        (err, token) => apiResponse(res, 'success', {
          customer,
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

      const customer = await Customer
        .where('email', email)
        .fetch();

      if (!customer) {
        const msg = 'The email doesn\'t exist.';
        return apiResponse(res, 'error', msg, 404, USR_05, 'email');
      }

      const isPasswordValid = await customer.compare(password);

      if (isPasswordValid) {
        // eslint-disable-next-line no-unused-vars
        // const { password: userPassword, ...nonSensitiveInfo } = foundUser.attributes;

        return jwt.sign(
          customer, secret, jwtConfig,
          (err, token) => apiResponse(res, 'success', {
            customer,
            accessToken: `Bearer ${token}`,
            expiresIn
          }));
      }

      const msg = 'Email or Password is invalid.';
      return apiResponse(res, 'error', msg, 404, USR_01, 'email');
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  fetchCustomer(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { aud, iat, exp, ...userInfo } = req.auth;

    return apiResponse(res, 'success', userInfo);
  },

  async updateCustomer(req, res) {
    try {
      const foundUser = await Customer
        .where('email', req.auth.email)
        .fetch();

      if (!foundUser) {
        const msg = 'The email doesn\'t exist.';
        return apiResponse(res, 'error', msg, 404, USR_05, 'email');
      }

      const updatedCustomer = await foundUser.save(req.body);

      return apiResponse(res, 'success', updatedCustomer);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async findOrCreate(userInfo) {
    const foundUser = await Customer
      .where('email', userInfo.email)
      .fetch();

    if (foundUser) {
      return foundUser;
    }

    const newUser = await new Customer(userInfo).save();
    return newUser;
  },

  async facebookLogin(req, res) {
    try {
      const { accessToken } = req.body;

      const { appId, appSecret } = config.facebook;

      const baseGraphURL = 'https://graph.facebook.com';
      const debugTokenUrl = `${baseGraphURL}/debug_token?input_token=${accessToken}`;
      const appToken = `access_token=${appId}|${appSecret}`;
      const validateTokenUrl = `${debugTokenUrl}&format=json&${appToken}`;
      const infoFormat = 'fields=email,id,first_name,last_name,picture';
      const facebookToken = `access_token=${accessToken}`;
      const userInfoFormatQuery = `format=json&${facebookToken}&${infoFormat}`;
      const getInfoUrl = `${baseGraphURL}/me?${userInfoFormatQuery}`;

      const validateTokenResponse = await axios.get(validateTokenUrl);

      const tokenDetails = validateTokenResponse.data.data;

      if (!tokenDetails.is_valid) {
        return apiResponse(res, 'error', 'Invalid Facebook Token', 400);
      }

      const userDetails = await axios.get(getInfoUrl);

      const { email, first_name, last_name } = userDetails.data;

      const formattedUserInfo = {
        email,
        name: `${first_name} ${last_name}`
      };

      const customer = await this.findOrCreate(formattedUserInfo);

      return jwt.sign(
        customer, secret, jwtConfig,
        (err, token) => apiResponse(res, 'success', {
          customer,
          accessToken: `Bearer ${token}`,
          expiresIn
        }));
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default CustomerCtrl;
