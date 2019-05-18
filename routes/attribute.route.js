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

export default router;
