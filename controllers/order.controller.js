// models
import Order from '../models/order.model';

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
  }
};

export default OrderCtrl;
