import { Router } from 'express';

// controllers
import OrderCtrl from '../controllers/order.controller';


const router = Router();

router.route('/')
  .post(OrderCtrl.createOrder);

router.route('/inCustomer')
  .get(OrderCtrl.fetchOrderDetailForCustomer);

router.route('/:order_id')
  .get(OrderCtrl.fetchOrderDetail);

export default router;
