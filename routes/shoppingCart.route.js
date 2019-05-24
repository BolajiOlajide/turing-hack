import { Router } from 'express';

// controllers
import ShoppingCartCtrl from '../controllers/shoppingCart.controller';


const router = Router();

router.route('/generateUniqueId')
  .get(ShoppingCartCtrl.generateCartId);

export default router;
