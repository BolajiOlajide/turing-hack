import { DEP_01 } from '../utils/errorCodes';

export const checkForValidDepartmentId = (req, res, next) => {
  const { departmentId } = req.params;

  const isNumber = !(isNaN(departmentId));
  if (!isNumber) {
    const error = new Error('departmentId should be a number');
    error.code = DEP_01;
    error.statusCode = 400;
    error.field = 'departmentId';
    return next(error);
  }
  return next();
};
