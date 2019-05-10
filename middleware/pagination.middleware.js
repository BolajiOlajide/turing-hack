import { PAG_01, PAG_02 } from '../utils/errorCodes';

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
