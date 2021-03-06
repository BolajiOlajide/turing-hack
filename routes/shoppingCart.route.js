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

router.route('/update/:item_id')
  .put(checkUserPayload(['quantity']), ShoppingCartCtrl.updateCartByItem);

router.route('/empty/:cart_id')
  .delete(ShoppingCartCtrl.emptyCart);

router.route('/totalAmount/:cart_id')
  .get(ShoppingCartCtrl.calculateCartTotalAmount);

router.route('/saveForLater/:item_id')
  .get(ShoppingCartCtrl.saveProductForLater);

router.route('/getSaved/:cart_id')
  .get(ShoppingCartCtrl.getSavedForLaterItems);

router.route('/removeProduct/:item_id')
  .delete(ShoppingCartCtrl.removeItemFromCart);

router.route('/:cart_id')
  .get(
    ShoppingCartCtrl.getProductInShoppingCart
  );

export default router;
