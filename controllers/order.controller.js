// models
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';

// utils
import apiResponse from '../utils/apiResponse';


const OrderCtrl = {
  async createOrder(req, res) {
    try {
      const orders = await Order.fetchAll();
      return apiResponse(res, 'success', orders);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchOrderDetail(req, res) {
    try {
      const { order_id } = req.params;

      const orders = await OrderDetail.where({ order_id }).fetchAll();

      const formattedOrders = orders.map(order => ({
        ...order.attributes,
        subtotal: Number(order.attributes.unit_cost) * Number(order.attributes.quantity)
      }));

      return apiResponse(res, 'success', formattedOrders);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchOrderDetailForCustomer(req, res) {
    try {
      const { customer_id } = req.auth;

      const resultProps = {
        columns: ['order_id', 'shipped_on', 'created_on', 'status', 'total_amount']
      };
      const orders = await Order.where({ customer_id }).fetchAll(resultProps);
      return apiResponse(res, 'success', orders);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default OrderCtrl;
