import { Router } from 'express';

// controllers
import CategoryCtrl from '../controllers/category.controller';

// utils
import { paginationCheck } from '../middleware/pagination.middleware';


const router = Router();

router.route('/')
  .get(
    paginationCheck(['category_id', 'name']),
    CategoryCtrl.fetchCategories
  );

export default router;
