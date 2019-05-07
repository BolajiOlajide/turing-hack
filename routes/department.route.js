import { Router } from 'express';

// controllers
import DeptCtrl from '../controllers/department.controller';


const router = Router();

router.route('/')
  .get(DeptCtrl.fetchDepartments);

router.route('/:departmentId')
  .get(DeptCtrl.fetchDepartmentById);

export default router;
