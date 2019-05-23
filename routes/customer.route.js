import { Router } from 'express';

// controllers
import CustomerCtrl from '../controllers/customer.controller';

// middlewares
import {
  checkUserPayload,
  validateEmail,
  checkOptionalUserPayload,
  validateCreditCard
} from '../middleware';


const router = Router();

router.route('/')
  .post(
    checkUserPayload(['name', 'email', 'password']),
    validateEmail,
    CustomerCtrl.createCustomer
  )
  .get(CustomerCtrl.fetchCustomer)
  .put(
    checkUserPayload(['name', 'email']),
    validateEmail,
    checkOptionalUserPayload(['password', 'day_phone', 'eve_phone', 'mob_phone']),
    CustomerCtrl.updateCustomer
  );

router.route('/login')
  .post(
    checkUserPayload(['email', 'password']),
    validateEmail,
    CustomerCtrl.signInCustomer
  );

router.route('/facebook')
  .post(checkUserPayload(['access_token']), CustomerCtrl.facebookLogin);

router.route('/creditCard')
  .put(checkUserPayload(['credit_card']), validateCreditCard, CustomerCtrl.updateCreditCard);

const addressFields = [
  'address_1',
  'city',
  'region',
  'postal_code',
  'country',
  'shipping_region_id'
];

router.route('/address')
  .put(
    checkUserPayload(addressFields),
    CustomerCtrl.updateCustomerAddress
  );

export default router;
