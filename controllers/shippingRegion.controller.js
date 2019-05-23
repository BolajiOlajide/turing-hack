// models
import ShippingRegion from '../models/shippingRegion.model';
import Shipping from '../models/shipping.model';

// utils
import apiResponse from '../utils/apiResponse';


const ShippingRegionCtrl = {
  async fetchShippingRegions(req, res) {
    try {
      const shippingRegions = await ShippingRegion.fetchAll();
      return apiResponse(res, 'success', shippingRegions);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchShippingsByRegion(req, res) {
    try {
      const { shipping_region_id } = req.params;

      const data = await Shipping.where({ shipping_region_id }).fetchAll({});

      return apiResponse(res, 'success', data);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ShippingRegionCtrl;
