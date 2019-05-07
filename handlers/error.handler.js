// utils
import apiResponse from '../utils/apiResponse';
import { AUT_01, AUT_02 } from '../utils/errorCodes';


export const catchErrors = (fn) => (req, res, next) => fn(req, res, next)
  .catch(next);

export const authErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return next(apiResponse(
      res,
      'error',
      err.message,
      401,
      AUT_02,
      'Authorization'
    ));
  }

  if (err.name === 'TokenError') {
    return next(apiResponse(
      res,
      'error',
      err.message,
      401,
      AUT_01,
      'Authorization'
    ));
  }
  return next(apiResponse(res, 'error', err.message, 400));
};
