import { CAT_O2 } from '../utils/errorCodes';

export const checkForValidDepartmentId = (req, res, next) => {
  const { departmentId } = req.params;

  const isNumber = !(isNaN(departmentId));
  if (!isNumber) {
    const error = new Error('category_id should be a number');
    error.code = CAT_O2;
    error.statusCode = 400;
    error.field = 'category_id';
    return next(error);
  }
  return next();
};
