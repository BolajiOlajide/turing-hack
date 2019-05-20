import db from '../db';

// models
import Product from '../models/product.model';
import ProductCategory from '../models/productCategory.model';
import Review from '../models/review.model';

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
      const whereClause = (all_words === 'on') ?
        ['description', 'LIKE', `%${query_string}%`] :
        ['description', 'LIKE', `%${query_string}%`];

      const { models, pagination: { rowCount: count } } = await Product
        .query(qb => qb
          .where(...whereClause)
          .column(...columns))
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
  },

  async fetchProductsByDepartmentId(req, res) {
    try {
      const { limit = 20, page = 1, description_length } = req.query;
      const { department_id } = req.params;

      const desc_length = isNaN(description_length) ? 200 : Number(description_length);
      const columns = [
        'product_category.product_id',
        'product.name',
        db.knex.raw('substr(product.description, 1, ?) as `description`', desc_length),
        'product.price',
        'product.discounted_price',
        'product.thumbnail',
        'product.display'
      ];
      const paginationQuery = { pageSize: limit, page };

      const { models, pagination: { rowCount: count } } = await ProductCategory
        .query(qb => qb
          .innerJoin('product', 'product_category.product_id', 'product.product_id')
          .innerJoin('category', 'category.category_id', 'product_category.category_id')
          .where('category.department_id', '=', department_id)
          .column(...columns))
        .fetchPage(paginationQuery);

      const result = { count, rows: models };

      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchProductDetails(req, res) {
    try {
      const { product_id } = req.params;

      const product = await Product.where({ product_id }).fetchAll();

      if (!product) {
        const msg = 'Don\'t exist product with this ID.';
        return apiResponse(res, 'error', msg, 404, PRD_03, 'product_id');
      }
      return apiResponse(res, 'success', product);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async getProductLocation(req, res) {
    try {
      const { product_id } = req.params;

      const columns = [
        'category.name as category_name',
        'category.category_id',
        'department.department_id',
        'department.name as department_name'
      ];

      const result = await ProductCategory
        .query(qb => qb
          .innerJoin('category', 'category.category_id', 'product_category.category_id')
          .innerJoin('department', 'department.department_id', 'category.department_id')
          .where('product_category.product_id', '=', product_id)
          .column(...columns))
        .fetchAll();

      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchProductReviews(req, res) {
    try {
      const { product_id } = req.params;

      const resultProps = { withRelated: ['product'] };
      const data = await Review.where({ product_id }).fetchAll(resultProps);

      const result = data.models.map((item) => ({
        name: item.relations.product.attributes.name,
        review: item.attributes.review,
        created_on: item.attributes.created_on,
        rating: item.attributes.rating
      }));

      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default ProductCtrl;
