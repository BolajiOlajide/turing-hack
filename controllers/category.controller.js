// models
import Category from '../models/category.model';
import ProductCategory from '../models/productCategory.model';

// utils
import apiResponse from '../utils/apiResponse';
import { CAT_01 } from '../utils/errorCodes';


const DeptCtrl = {
  async fetchCategories(req, res) {
    try {
      const { order: orderString = '', limit = 20, page = 1 } = req.query;

      const order = orderString.split(',');
      const { models, pagination: { rowCount: count } } = await Category
        .query(qb => qb.groupBy('category_id'))
        .orderBy(...order)
        .fetchPage({
          pageSize: limit,
          page
        });

      const result = { count, rows: models };
      return apiResponse(res, 'success', result);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchCategoryById(req, res) {
    try {
      const { category_id } = req.params;

      const category = await Category.where({ category_id }).fetch();

      if (!category) {
        const msg = 'Don\'t exist category with this ID.';
        return apiResponse(res, 'error', msg, 404, CAT_01, 'category_id');
      }
      return apiResponse(res, 'success', category);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchCategiesByProduct(req, res) {
    try {
      const { product_id } = req.params;

      const category = await Category.where({ category_id }).fetch();

      if (!category) {
        const msg = 'Don\'t exist category with this ID.';
        return apiResponse(res, 'error', msg, 404, CAT_01, 'category_id');
      }
      return apiResponse(res, 'success', category);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default DeptCtrl;
