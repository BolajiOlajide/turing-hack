import { Router } from 'express';

// controllers
import ShoppingCartCtrl from '../controllers/shoppingCart.controller';

// middleware
import { checkUserPayload } from '../middleware';


const router = Router();

router.route('/generateUniqueId')
  .get(ShoppingCartCtrl.generateCartId);

router.route('/add')
  .post(
    checkUserPayload(['cart_id', 'product_id', 'attributes']),
    ShoppingCartCtrl.createShoppingCart
  );

router.route('/:cart_id')
  .get(
    ShoppingCartCtrl.getProductInShoppingCart
  );

export default router;
