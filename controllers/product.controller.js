import db from '../db';
// models
import Product from '../models/product.model';

// utils
import apiResponse from '../utils/apiResponse';


const ProductCtrl = {
  async fetchAllProducts(req, res) {
    try {
      const { limit = 20, page = 1, description_length = 200 } = req.query;

      const desc_length = isNaN(description_length) ? 200 : Number(description_length);
      const columns = [
        'product_id',
        'name',
        // 'description as desc',
        db.knex.raw('substr(description, 1, ?) as `description`', desc_length),
        'price',
        'discounted_price',
        'thumbnail'
      ];
      const paginationQuery = { pageSize: limit, page };

      const { models, pagination: { rowCount: count } } = await Product
        .query(qb => qb.column(...columns))
        .fetchPage(paginationQuery);

      const result = { count, rows: models };
      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ProductCtrl;
