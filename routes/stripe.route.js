import { Router } from 'express';

// controllers
import StripeCtrl from '../controllers/stripe.controller';

// middleware
import { checkUserPayload } from '../middleware';


const router = Router();

router.route('/charge')
  .post(
    checkUserPayload(['order_id', 'stripeToken', 'description', 'amount', 'currency']),
    StripeCtrl.chargeCustomer
  );

router.route('/webhooks')
  .post(StripeCtrl.webhookReceiver);

export default router;
