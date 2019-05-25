import Stripe from 'stripe';
import config from 'lazy-config';

// models
import Order from '../models/order.model';

// utils
import apiResponse from '../utils/apiResponse';


const { token } = config.stripe;
const stripeClient = Stripe(token);

const StripeCtrl = {
  async chargeCustomer(req, res) {
    try {
      const {
        stripeToken,
        order_id,
        description,
        amount,
        currency = 'USD'
      } = req.body;

      const chargeObj = {
        amount: parseFloat(amount, 10),
        description: `${order_id}|${description}`,
        source: stripeToken,
        currency
      };

      const stripeDetails = await stripeClient.charge(chargeObj);

      return apiResponse(res, 'success', stripeDetails);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async webhookReceiver(req, res) {
    try {
      const { type, data: { object: webhookPayload } } = req.body;

      if (type === 'charge.succeeded') {
        const { description: jointDescription } = webhookPayload;
        const [order_id] = jointDescription.split('|');

        const order = await Order.where({ order_id }).fetch();
        await order.save({ status: true });
      }

      return apiResponse(res, 'success', 'OK');
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default StripeCtrl;
