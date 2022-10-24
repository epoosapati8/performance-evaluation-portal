import EmployeeService from '../services/employees-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class EmployeesController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createEmployee
      @param { object } req
      @param { object } res
      @param { object } next
      Function creates an employee
    */
  public static async createEmployee(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add an employee",
                schema: { $ref: "#/definitions/AddEmployee" }
        } */
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const { body } = req;
    try {
      const result: any = await EmployeeService.createEmployee(body);
      /* #swagger.responses[201] = { 
                    description: 'Employee created successfully.',
                    schema: { $ref: "#/definitions/EmployeePostResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getEmployeeById
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns an employee by Id.
  */
  public static async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { userId }
    } = req;
    try {
      const result: any = await EmployeeService.getEmployeesById(userId);
      /* #swagger.responses[200] = { 
                    description: 'Employee successfully obtained.',
                    schema: { $ref: "#/definitions/EmployeeUserResponse" } 
        } */

      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
    @function getEmployeeByEmpId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns an employee by empId.
  */
  public static async getEmployeesByEmpId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    const {
      params: { empId }
    } = req;
    try {
      const result: any = await EmployeeService.getEmployeesByEmpId(empId);
      /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
      /* #swagger.responses[200] = { 
                    description: 'Employee successfully obtained.',
                    schema: { $ref: "#/definitions/EmployeeUserResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
    @function getAllEmployees
    @param { object } req
    @param { object } res
    Function returns all the employees.
  */
  public static async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    try {
      const result: any = await EmployeeService.getAllEmployees();
      /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
      /* #swagger.responses[200] = { 
                    description: 'Employees successfully obtained.',
                    schema: { $ref: "#/definitions/EmployeeAllResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function updateEmployee
    @param { object } req
    @param { object } res
    Function updates an employee.
  */
  public static async updateEmployee(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      body,
      params: { userId }
    } = req;
    try {
      const result: any = await EmployeeService.updateEmployee(userId, body);
      /* #swagger.responses[200] = { 
                    description: 'Employee Updated Successfully',
                    schema: { $ref: "#/definitions/EmployeeUpdateResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteEmployee
    @param { object } req
    @param { object } res
    Function deletes an employee by id.
  */
  public static async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { userId }
    } = req;
    try {
      const result: any = await EmployeeService.deleteEmployee(userId);
      /* #swagger.responses[202] = { 
                    description: 'Employee Deleted Successfully.',
                    schema: { $ref: "#/definitions/EmployeeDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getYearOfJoining
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns the year pf joining by empId.
  */
  public static async getYearOfJoining(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Employees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { empId }
    } = req;
    try {
      const result: any = await EmployeeService.getYearOfJoining(empId);
      /* #swagger.responses[200] = { 
                    description: 'Year Of Joining of Employee obtained.',
                    schema: { $ref: "#/definitions/EmployeeYOJResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeesController;
