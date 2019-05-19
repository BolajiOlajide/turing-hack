import { Router } from 'express';

// controllers
import ProductCtrl from '../controllers/product.controller';

// middleware
import {
  paginationCheck, normalizeAllWords, checkQueryString, checkForValidProductId
} from '../middleware';

const router = Router();

router.route('/')
  .get(
    paginationCheck([]),
    ProductCtrl.fetchAllProducts
  );

router.route('/search')
  .get(checkQueryString, normalizeAllWords, ProductCtrl.searchProduct);

router.route('/:product_id')
  .get(checkForValidProductId, ProductCtrl.fetchProductById);


export default router;
