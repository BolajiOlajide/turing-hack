import { Router } from 'express';

// controllers
import CategoryCtrl from '../controllers/category.controller';

// middleware
import { paginationCheck, checkForValidCategoryId } from '../middleware';


const router = Router();

router.route('/')
  .get(
    paginationCheck(['category_id', 'name']),
    CategoryCtrl.fetchCategories
  );

router.route('/:category_id')
  .get(checkForValidCategoryId, CategoryCtrl.fetchCategoryById);

router.route('/categories/inProduct/:product_id')
  .get(CategoryCtrl.fetchCategiesByProduct);

export default router;
