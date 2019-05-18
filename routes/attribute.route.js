import { Router } from 'express';

// controllers
import AttributeCtrl from '../controllers/attribute.controller';

// middleware
import { checkForValidAttributeId, checkForValidProductId } from '../middleware';


const router = Router();

router.route('/')
  .get(AttributeCtrl.fetchAttributes);

router.route('/:attribute_id')
  .get(checkForValidAttributeId, AttributeCtrl.fetchAttribute);

router.route('/values/:attribute_id')
  .get(checkForValidAttributeId, AttributeCtrl.fetchAttributeValue);

router.route('/inProduct/:product_id')
  .get(checkForValidProductId, AttributeCtrl.fetchProductAttributeValue);

export default router;
