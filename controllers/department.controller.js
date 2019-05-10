// models
import Department from '../models/department.model';

// utils
import apiResponse from '../utils/apiResponse';
import { DEP_02 } from '../utils/errorCodes';


const DeptCtrl = {
  async fetchDepartments(req, res) {
    try {
      const departments = await Department.fetchAll();
      return apiResponse(res, 'success', departments);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  },
  async fetchDepartmentById(req, res) {
    try {
      const { departmentId } = req.params;

      const department = await Department.where({ department_id: departmentId }).fetch();

      if (!department) {
        const msg = 'Don\'t exist department with this ID.';
        return apiResponse(res, 'error', msg, 404, DEP_02, 'department_id');
      }
      return apiResponse(res, 'success', department);
    } catch (error) {
      return apiResponse(res, 'error', error.message, 400);
    }
  }
};

export default DeptCtrl;
