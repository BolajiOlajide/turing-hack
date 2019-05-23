import { Router } from 'express';

// controllers
import OrderCtrl from '../controllers/order.controller';


const router = Router();

router.route('/')
  .post(OrderCtrl.createOrder);

export default router;
