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
  },

  async getProductInShoppingCart(req, res) {
    try {
      const { cart_id } = req.params;

      const resultProps = { withRelated: ['product'] };
      const cartItems = await ShopppingCart.where({ cart_id }).fetchAll(resultProps);
      const result = cartItems.toJSON();

      const formattedResult = result.map(({
        item_id,
        product: { name, price, image },
        attributes,
        product_id,
        quantity
      }) => ({
        item_id,
        name,
        price,
        image,
        attributes,
        product_id,
        quantity,
        subtotal: Number(quantity) * Number(price)
      }));

      return apiResponse(res, 'success', formattedResult);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ShoppingCartCtrl;
