import { Router } from 'express';

// controllers
import CustomerCtrl from '../controllers/customer.controller';


const router = Router();

router.route('/')
  .post(CustomerCtrl.createCustomer);

export default router;
