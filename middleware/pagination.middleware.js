import apiResponse from '../utils/apiResponse';
import { PAG_O1, PAG_02 } from '../utils/errorCodes';

export const paginationCheck = (req, res, next, allowedFields = []) => {
  const { order } = req.query;
  console.log(allowedFields);

  if (order) {
    return next();
  }
  next();
};
