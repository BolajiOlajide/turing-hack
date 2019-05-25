import db from '../db';

// models
import ShopppingCart from '../models/shoppingCart.model';

// utils
import apiResponse from '../utils/apiResponse';
import { generateCartId } from '../utils/cart';
import { USR_02 } from '../utils/errorCodes';


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
  },

  async updateCartByItem(req, res) {
    try {
      const { item_id } = req.params;
      const { quantity } = req.body;

      const cartItem = await ShopppingCart.where('item_id', item_id).fetch();

      if (!cartItem) {
        const msg = 'The item_id doesn\'t exist.';
        return apiResponse(res, 'error', msg, 404, USR_02, 'item_id');
      }

      const updatedCartItem = await cartItem.save({ quantity });
      const cartItemJson = updatedCartItem.toJSON();

      return apiResponse(res, 'success', cartItemJson);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async emptyCart(req, res) {
    try {
      const { cart_id } = req.params;

      const rawSql = `DELETE FROM shopping_cart
      WHERE cart_id = ?
      `;

      await db.knex.raw(rawSql, cart_id);

      return apiResponse(res, 'success', []);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async calculateCartTotalAmount(req, res) {
    try {
      const { cart_id } = req.params;

      const resultProps = { withRelated: ['product'] };
      const cartItems = await ShopppingCart.where({ cart_id }).fetchAll(resultProps);

      const cartItemsJson = cartItems.toJSON();

      const totalAmountReducer = (accumulator, cartItem) => {
        const productPrice = parseFloat(cartItem.product.price, 10);
        const productQuantity = parseInt(cartItem.quantity, 10);
        const totalCost = productPrice * productQuantity;
        return accumulator + parseFloat(totalCost, 10);
      };
      const totalAmount = cartItemsJson.reduce(totalAmountReducer, 0).toFixed(2);

      return apiResponse(res, 'success', { totalAmount });
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async saveProductForLater(req, res) {
    try {
      const { item_id } = req.params;

      const cartItem = await ShopppingCart
        .where('item_id', item_id)
        .fetch();

      if (!cartItem) {
        const msg = 'The item_id doesn\'t exist.';
        return apiResponse(res, 'error', msg, 404, USR_02, 'item_id');
      }

      await cartItem.save({ buy_now: 0 });

      return apiResponse(res, 'success', '');
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async getSavedForLaterItems(req, res) {
    try {
      const { cart_id } = req.params;

      const cartItems = await ShopppingCart
        .where({ cart_id, buy_now: 0 })
        .fetchAll();

      return apiResponse(res, 'success', cartItems);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ShoppingCartCtrl;
