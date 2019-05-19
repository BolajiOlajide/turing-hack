import { Router } from 'express';

// controllers
import ProductCtrl from '../controllers/product.controller';

// middleware
import { paginationCheck } from '../middleware';

const router = Router();

router.route('/')
  .get(
    paginationCheck([]),
    ProductCtrl.fetchAllProducts
  );


export default router;
