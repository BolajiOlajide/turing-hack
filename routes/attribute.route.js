import { Router } from 'express';

// controllers
import AttributeCtrl from '../controllers/attribute.controller';

// middleware
import { checkForValidAttributeId } from '../middleware';


const router = Router();

router.route('/')
  .get(AttributeCtrl.fetchAttributes);

router.route('/:attribute_id')
  .get(checkForValidAttributeId, AttributeCtrl.fetchAttribute);

router.route('/values/:attribute_id')
  .get(checkForValidAttributeId, AttributeCtrl.fetchAttributeValue);

export default router;
