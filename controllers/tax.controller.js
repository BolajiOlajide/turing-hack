// models
import Tax from '../models/tax.model';

// utils
import apiResponse from '../utils/apiResponse';
import { TAX_01 } from '../utils/errorCodes';


const TaxCtrl = {
  async fetchAllTaxes(req, res) {
    try {
      const taxes = await Tax.fetchAll();
      return apiResponse(res, 'success', taxes);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchTaxById(req, res) {
    try {
      const { tax_id } = req.params;

      const tax = await Tax.where({ tax_id }).fetch();

      if (!tax) {
        const msg = 'Don\'t exist tax with this ID.';
        return apiResponse(res, 'error', msg, 404, TAX_01, 'tax_id');
      }

      return apiResponse(res, 'success', tax);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default TaxCtrl;
