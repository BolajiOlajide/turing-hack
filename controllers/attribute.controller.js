import db from '../db';

// models
import Attribute from '../models/attribute.model';
import AttributeValue from '../models/attributeValue.model';

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
  },

  async fetchAttributeValue(req, res) {
    try {
      const { attribute_id } = req.params;

      const attribute_value = await AttributeValue
        .where({ attribute_id }).fetchAll({
          columns: ['attribute_value_id', 'value']
        });

      return apiResponse(res, 'success', attribute_value);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchProductAttributeValue(req, res) {
    try {
      const { product_id } = req.params;
      const query = `SELECT aa.name, av.attribute_value_id, av.value FROM product_attribute AS pa
      INNER JOIN attribute_value AS av ON av.attribute_value_id = pa.attribute_value_id
      INNER JOIN attribute AS aa ON aa.attribute_id = av.attribute_id
      WHERE pa.product_id = ?
      `;
      const [attributes] = await db.knex.raw(query, product_id);

      return apiResponse(res, 'success', attributes);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default AttributeCtrl;
