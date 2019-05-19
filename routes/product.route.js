import { Router } from 'express';

// controllers
import ProductCtrl from '../controllers/product.controller';

// middleware
import {
  paginationCheck,
  normalizeAllWords,
  checkQueryString,
  checkForValidProductId,
  checkForValidCategoryId,
  checkForValidDepartmentId
} from '../middleware';

const router = Router();

router.route('/')
  .get(
    paginationCheck([]),
    ProductCtrl.fetchAllProducts
  );

router.route('/search')
  .get(
    paginationCheck([]),
    checkQueryString,
    normalizeAllWords,
    ProductCtrl.searchProduct
  );

router.route('/:product_id')
  .get(checkForValidProductId, ProductCtrl.fetchProductById);

router.route('/inCategory/:category_id')
  .get(
    paginationCheck([]),
    checkForValidCategoryId,
    ProductCtrl.fetchProductsByCategoryId
  );

router.route('/inDepartment/:department_id')
  .get(
    paginationCheck([]),
    checkForValidDepartmentId,
    ProductCtrl.fetchProductsByDepartmentId
  );

router.route('/:product_id/details')
  .get(checkForValidProductId, ProductCtrl.fetchProductDetails);


export default router;
