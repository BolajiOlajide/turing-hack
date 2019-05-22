import R from 'ramda';
import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

import {
  CAT_O2,
  PRD_01,
  DEP_01,
  PAG_02,
  PAG_01,
  ATT_02,
  PRD_02,
  PRD_04,
  USR_02,
  USR_03,
  USR_08,
  USR_09,
  USR_10
} from '../utils/errorCodes';


export const paginationCheck = (allowedFields = []) => (req, res, next) => {
  const { order: orderString, limit, page } = req.query;

  if ((limit && isNaN(limit)) || (page && isNaN(page))) {
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

  const isNotANumber = isNaN(department_id);
  if (isNotANumber) {
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

  const isNotANumber = isNaN(category_id);
  if (isNotANumber) {
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

  const isNotANumber = isNaN(product_id);
  if (isNotANumber) {
    const error = new Error('product_id should be a number');
    error.code = PRD_01;
    error.statusCode = 400;
    error.field = 'product_id';
    return next(error);
  }
  return next();
};

export const checkForValidAttributeId = (req, res, next) => {
  const { attribute_id } = req.params;

  const isNotANumber = isNaN(attribute_id);
  if (isNotANumber) {
    const error = new Error('attribute should be a number');
    error.code = ATT_02;
    error.statusCode = 400;
    error.field = 'attribute_id';
    return next(error);
  }
  return next();
};

export const normalizeAllWords = (req, res, next) => {
  const { all_words } = req.query;

  // eslint-disable-next-line max-len
  const validAllWords = all_words && ((all_words.toLowerCase() === 'on') || (all_words.toLowerCase() === 'off'));

  if (validAllWords) {
    req.all_words = all_words.toLowerCase();
  } else {
    req.all_words = 'on';
  }

  return next();
};

export const checkQueryString = (req, res, next) => {
  const { query_string } = req.query;

  if (query_string === undefined) {
    const error = new Error('query_string must be present');
    error.code = PRD_02;
    error.statusCode = 400;
    error.field = 'query_string';
    return next(error);
  }
  return next();
};

export const checkValidRating = (req, res, next) => {
  const { rating } = req.body;

  const isNotANumber = isNaN(rating);
  if (isNotANumber) {
    const error = new Error('rating must be an integer');
    error.code = PRD_04;
    error.statusCode = 400;
    error.field = 'rating';
    return next(error);
  }
  return next();
};

export const checkUserPayload = allowedFields => (req, res, next) => {
  const keys = Object.keys(req.body);

  const difference = R.difference(allowedFields, keys);

  if (difference.length > 0) {
    const error = new Error(`The field ${difference[0]} is required`);
    error.code = USR_02;
    error.statusCode = 400;
    error.field = difference[0];
    return next(error);
  }

  return next();
};

export const checkOptionalUserPayload = allowedFields => (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { name, email, ...filteredItems } = req.body;
  const filteredKeys = Object.keys(filteredItems);

  const difference = R.difference(filteredKeys, allowedFields);

  if (difference.length > 0) {
    const error = new Error(`The field ${difference[0]} isn't required`);
    error.code = USR_10;
    error.statusCode = 400;
    error.field = difference[0];
    return next(error);
  }

  return next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const isValidEmail = isEmail(email);

  if (!isValidEmail) {
    const error = new Error('The email is invalid');
    error.code = USR_03;
    error.statusCode = 400;
    error.field = email;
    return next(error);
  }

  return next();
};

export const validateCreditCard = (req, res, next) => {
  const { credit_card } = req.body;

  const isValidCreditCard = isNumeric(credit_card);

  if (!isValidCreditCard) {
    const error = new Error('this is an invalid Credit Card.');
    error.code = USR_08;
    error.statusCode = 400;
    error.field = credit_card;
    return next(error);
  }

  return next();
};

export const validateShippingRegion = (req, res, next) => {
  const { shipping_region_id } = req.body;

  const isValidRegionID = isNumeric(shipping_region_id);

  if (!isValidRegionID) {
    const error = new Error('The Shipping Region ID is not number');
    error.code = USR_09;
    error.statusCode = 400;
    error.field = shipping_region_id;
    return next(error);
  }

  return next();
};
