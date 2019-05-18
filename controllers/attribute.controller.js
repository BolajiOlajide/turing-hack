// models
import Attribute from '../models/attribute.model';

// utils
import apiResponse from '../utils/apiResponse';
import { ATT_01 } from '../utils/errorCodes';


const AttributeCtrl = {
  async fetchAttributes(req, res) {
    try {
      const attributes = await Attribute.fetchAll();
      return apiResponse(res, 'success', attributes);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchAttribute(req, res) {
    try {
      const { attribute_id } = req.params;
      const attribute = await Attribute.where({ attribute_id }).fetch();

      if (!attribute) {
        const msg = 'Don\'t exist attribute with this ID.';
        return apiResponse(res, 'error', msg, 404, ATT_01, 'attribute_id');
      }

      return apiResponse(res, 'success', attribute);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default AttributeCtrl;
