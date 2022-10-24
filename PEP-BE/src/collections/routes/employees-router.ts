import { Router, Request } from 'express';
import Employees from '../controllers/employees-controller';
import EmployeeValidation from '../validations/employees-validation';
import verifyAccessToken from '../../middlewares/verify-token';
import ErrorMiddleware from '../../middlewares/error';
import { verify } from 'jsonwebtoken';

const router = Router();
router.post(
  '/',
  ErrorMiddleware(EmployeeValidation.checkEmployee, 'body'),
  verifyAccessToken,
  Employees.createEmployee
);
router.get(
  '/:userId',
  ErrorMiddleware(EmployeeValidation.checkId, 'params'),
  verifyAccessToken,
  Employees.getEmployeeById
);
router.get('/profile/:empId', verifyAccessToken, Employees.getEmployeesByEmpId);
router.get('/', verifyAccessToken, Employees.getAllEmployees);
router.put(
  '/:userId',
  [
    ErrorMiddleware(EmployeeValidation.checkEmployee, 'body'),
    ErrorMiddleware(EmployeeValidation.checkId, 'params')
  ],
  verifyAccessToken,
  Employees.updateEmployee
);
router.delete(
  '/:userId',
  ErrorMiddleware(EmployeeValidation.checkId, 'params'),
  verifyAccessToken,
  Employees.deleteEmployee
);
router.get('/year/:empId', verifyAccessToken, Employees.getYearOfJoining);

export default router;
