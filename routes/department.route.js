import { Router } from 'express';

// controllers
import DeptCtrl from '../controllers/department.controller';

// middleware
import { checkForValidDepartmentId } from '../middleware/department.middleware';


const router = Router();

router.route('/')
  .get(DeptCtrl.fetchDepartments);

router.route('/:department_id')
  .get(checkForValidDepartmentId, DeptCtrl.fetchDepartmentById);

export default router;
