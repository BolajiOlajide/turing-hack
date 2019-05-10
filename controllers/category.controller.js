// models
import Category from '../models/category.model';

// utils
import apiResponse from '../utils/apiResponse';


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
  }
};

export default DeptCtrl;
