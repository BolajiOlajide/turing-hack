// models
import Category from '../models/category.model';

// utils
import apiResponse from '../utils/apiResponse';


const DeptCtrl = {
  async fetchCategories(req, res) {
    try {
      const { order = '+category_id', limit = 20, page = 1 } = req.query;

      const categories = await Category
        .query(qb => qb.where('category_id', '<>', 1))
        .orderBy(order)
        .fetchPage({
          pageSize: limit,
          page
        });


      // const departments = await Category.fetchAll();
      return apiResponse(res, 'success', categories);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default DeptCtrl;
