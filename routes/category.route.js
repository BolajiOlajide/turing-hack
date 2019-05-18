import { Router } from 'express';

// controllers
import CategoryCtrl from '../controllers/category.controller';

// middleware
import {
  paginationCheck,
  checkForValidCategoryId,
  checkForValidDepartmentId,
  checkForValidProductId
} from '../middleware';


const router = Router();

router.route('/')
  .get(
    paginationCheck(['category_id', 'name']),
    CategoryCtrl.fetchCategories
  );

router.route('/:category_id')
  .get(checkForValidCategoryId, CategoryCtrl.fetchCategoryById);

router.route('/inProduct/:product_id')
  .get(checkForValidProductId, CategoryCtrl.fetchCategiesByProduct);

router.route('/inDepartment/:department_id')
  .get(checkForValidDepartmentId, CategoryCtrl.fetchCategoriesByDepartment);

export default router;
