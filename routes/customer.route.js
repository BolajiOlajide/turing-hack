import { Router } from 'express';

// controllers
import CustomerCtrl from '../controllers/customer.controller';

// middlewares
import { checkUserPayload, validateEmail } from '../middleware';


const router = Router();

router.route('/')
  .post(
    checkUserPayload(['name', 'email', 'password']),
    validateEmail,
    CustomerCtrl.createCustomer
  )
  .get(CustomerCtrl.fetchCustomer);

router.route('/login')
  .post(
    checkUserPayload(['email', 'password']),
    validateEmail,
    CustomerCtrl.signInCustomer
  );

export default router;
