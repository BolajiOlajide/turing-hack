import { CAT_O2, PRD_01, DEP_01, PAG_02, PAG_01 } from '../utils/errorCodes';


export const paginationCheck = allowedFields => (req, res, next) => {
  const { order: orderString, limit, page } = req.query;

  if (isNaN(limit) || isNaN(page)) {
    const error = new Error('Limit and Page must be of numeric value');
    error.code = PAG_02;
    error.statusCode = 400;
    error.field = 'order';
    return next(error);
  }

  if (orderString === undefined) {
    return next();
  }

  const [field, order] = orderString.split(',');
  const validOrderRegex = /^(ASC|DESC)$/;

  if (!validOrderRegex.test(order)) {
    const error = new Error('The order is not matched \'field,(DESC|ASC)\'.');
    error.code = PAG_01;
    error.statusCode = 400;
    error.field = 'order';
    return next(error);
  }

  if (!allowedFields.includes(field)) {
    const error = new Error('The field of order is not allow sorting.');
    error.code = PAG_02;
    error.statusCode = 400;
    error.field = 'order';
    return next(error);
  }

  return next();
};

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

export const checkForValidCategoryId = (req, res, next) => {
  const { category_id } = req.params;

  const isNumber = !(isNaN(category_id));
  if (!isNumber) {
    const error = new Error('category_id should be a number');
    error.code = CAT_O2;
    error.statusCode = 400;
    error.field = 'category_id';
    return next(error);
  }
  return next();
};

export const checkForValidProductId = (req, res, next) => {
  const { product_id } = req.params;

  const isNumber = !(isNaN(product_id));
  if (!isNumber) {
    const error = new Error('product_id should be a number');
    error.code = PRD_01;
    error.statusCode = 400;
    error.field = 'product_id';
    return next(error);
  }
  return next();
};
