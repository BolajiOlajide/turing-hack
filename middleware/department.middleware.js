import { DEP_01 } from '../utils/errorCodes';

export const checkForValidDepartmentId = (req, res, next) => {
  const { department_id } = req.params;

  const isNumber = !(isNaN(department_id));
  if (!isNumber) {
    const error = new Error('departmentId should be a number');
    error.code = DEP_01;
    error.statusCode = 400;
    error.field = 'department_id';
    return next(error);
  }
  return next();
};
