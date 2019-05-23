import { Router } from 'express';

// controllers
import ShippingRegionCtrl from '../controllers/shippingRegion.controller';


const router = Router();

router.route('/')
  .get(ShippingRegionCtrl.fetchShippingRegions);

router.route('/:shipping_region_id')
  .get(ShippingRegionCtrl.fetchShippingsByRegion);

export default router;
