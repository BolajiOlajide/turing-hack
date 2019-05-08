import { Router } from 'express';

// controllers
import CategoryCtrl from '../controllers/category.controller';


const router = Router();

router.route('/')
  .get(CategoryCtrl.fetchCategories);

export default router;
