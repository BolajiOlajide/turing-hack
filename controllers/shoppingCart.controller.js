import uuidv4 from 'uuid/v4';

// utils
import apiResponse from '../utils/apiResponse';


const ShoppingCartCtrl = {
  generateCartId(req, res) {
    const uniqueId = uuidv4();
    return apiResponse(res, 'success', { cart_id: uniqueId });
  }
};

export default ShoppingCartCtrl;
