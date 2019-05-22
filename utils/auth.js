import R from 'ramda';

import { AUT_02 } from './errorCodes';


export const getToken = (req) => {
  const userKey = R.prop('user-key', req.headers);
  if (!userKey) {
    const error = new Error('Authorization code is empty.');
    error.code = AUT_02;
    error.statusCode = 401;
    error.field = 'NoAuth';
    throw error;
  } else if (req.headers['user-key'] && req.headers['user-key'].split(' ')[0] === 'Bearer') {
    return req.headers['user-key'].split(' ')[1];
  }
  return null;
};
