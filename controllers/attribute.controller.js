// models
import Attribute from '../models/attribute.model';

// utils
import apiResponse from '../utils/apiResponse';


const AttributeCtrl = {
  async fetchAttributes(req, res) {
    try {
      const attributes = await Attribute.fetchAll();
      return apiResponse(res, 'success', attributes);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default AttributeCtrl;
