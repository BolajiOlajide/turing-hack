import { Router } from 'express';

// controllers
import AttributeCtrl from '../controllers/attribute.controller';


const router = Router();

router.route('/')
  .get(AttributeCtrl.fetchAttributes);

export default router;
