import db from '../db';
// models
import Category from '../models/category.model';

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
      const query = `SELECT ca.category_id, ca.department_id, ca.name FROM product_category AS pc
      INNER JOIN category AS ca ON pc.category_id = ca.category_id
      WHERE pc.product_id = ?
      `;

      const [categories] = await db.knex.raw(query, product_id);

      return apiResponse(res, 'success', categories);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },

  async fetchCategoriesByDepartment(req, res) {
    try {
      const { department_id } = req.params;

      const categories = await Category.where({ department_id }).fetchAll();
      return apiResponse(res, 'success', categories);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default DeptCtrl;
