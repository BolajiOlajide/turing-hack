import db from '../db';

// models
import Product from '../models/product.model';
import ProductCategory from '../models/productCategory.model';

// utils
import apiResponse from '../utils/apiResponse';
import { PRD_03 } from '../utils/errorCodes';


const ProductCtrl = {
  async fetchAllProducts(req, res) {
    try {
      const { limit = 20, page = 1, description_length } = req.query;

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
  },

  async searchProduct(req, res) {
    try {
      const { limit = 20, page = 1, description_length, query_string } = req.query;
      const { all_words } = req;

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

      console.log(paginationQuery, columns);
      const { models, pagination: { rowCount: count } } = await Product
        .query(qb => qb
          .where('description', 'LIKE', `${query_string}%`)
          .column(...columns)
        )
        .fetchPage(paginationQuery);

      const result = { count, rows: models };

      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchProductById(req, res) {
    try {
      const { product_id } = req.params;

      const product = await Product.where({ product_id }).fetch();

      if (!product) {
        const msg = 'Don\'t exist product with this ID.';
        return apiResponse(res, 'error', msg, 404, PRD_03, 'product_id');
      }
      return apiResponse(res, 'success', product);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchProductsByCategoryId(req, res) {
    try {
      const { limit = 20, page = 1, description_length } = req.query;
      const { category_id } = req.params;

      const desc_length = isNaN(description_length) ? 200 : Number(description_length);
      const columns = [
        'product_category.product_id',
        'product.name',
        db.knex.raw('substr(product.description, 1, ?) as `description`', desc_length),
        'product.price',
        'product.discounted_price',
        'product.thumbnail'
      ];
      const paginationQuery = { pageSize: limit, page };

      const { models, pagination: { rowCount: count } } = await ProductCategory
        .query(qb => qb
          .innerJoin('product', 'product_category.product_id', 'product.product_id')
          .where('product_category.category_id', '=', category_id)
          .column(...columns))
        .fetchPage(paginationQuery);

      const result = { count, rows: models };

      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ProductCtrl;
