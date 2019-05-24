import { Router } from 'express';

// controllers
import ShoppingCartCtrl from '../controllers/shoppingCart.controller';

// middleware
import { checkUserPayload } from '../middleware';


const router = Router();

router.route('/generateUniqueId')
  .get(ShoppingCartCtrl.generateCartId);

router.route('/add')
  .get(
    checkUserPayload(['cart_id', 'product_id', 'attributes']),
    ShoppingCartCtrl.createShoppingCart
  );

export default router;
