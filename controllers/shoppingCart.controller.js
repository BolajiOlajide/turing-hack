// models
import ShopppingCart from '../models/shoppingCart.model';

// utils
import apiResponse from '../utils/apiResponse';
import { generateCartId } from '../utils/cart';


const ShoppingCartCtrl = {
  generateCartId(req, res) {
    const uniqueId = generateCartId();
    return apiResponse(res, 'success', { cart_id: uniqueId });
  },

  async createShoppingCart(req, res) {
    try {
      const { product_id, cart_id, attributes } = req.body;

      const cartObj = { cart_id, product_id, attributes };
      const cart = await new ShopppingCart(cartObj).save();

      return apiResponse(res, 'success', cart);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ShoppingCartCtrl;
