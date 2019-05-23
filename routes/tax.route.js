import { Router } from 'express';

// controllers
import TaxCtrl from '../controllers/tax.controller';

// middleware
import { checkForValidTaxId } from '../middleware';


const router = Router();

router.route('/')
  .get(TaxCtrl.fetchAllTaxes);

router.route('/:tax_id')
  .get(checkForValidTaxId, TaxCtrl.fetchTaxById);

export default router;
