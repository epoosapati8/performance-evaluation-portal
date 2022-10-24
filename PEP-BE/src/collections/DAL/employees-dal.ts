import DAL_ERROR from '../../commons/dal-error';
import EmployeeService from '../services/employees-service';
import EmployeeModel from '../models/employees-model';
import { MongooseUpdateQuery, Document } from 'mongoose';
class Employees {
  /**
    @function createEmployee
    @param { object } payload
    Function creates an employee
  */
  public static async createEmployee(payload: any) {
    try {
      const result = await EmployeeService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /**
    @function getEmployeesById
    @param { object } userId
    Function returns employees data by userId
  */
  public static async getEmployeesById(userId: any) {
    try {
      return await EmployeeModel.findOne({ _id: userId, isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getEmployeesByEmpId
    @param { object } empId
    Function returns employees data by empId
  */
  public static async getEmployeesByEmpId(empId: any) {
    try {
      return await EmployeeModel.findOne({ empId: empId, isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
   * @function getAllEmployees
   * @param {object} userId
   *
   * function to return all employees.
   */
  public static async getAllEmployees() {
    try {
      return await EmployeeModel.find({ isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function updateEmployee
    @param { object } userId
    @param { object } payload
    Function updates an employee
  */
  public static async updateEmployee(
    userId: any,
    payload: MongooseUpdateQuery<Pick<Document, '_id'>>
  ) {
    try {
      const user: any = await EmployeeModel.findByIdAndUpdate(userId, payload).setOptions({
        new: true,
        overwrite: true
      });
      user.updatedAt = new Date();
      return user.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }

  /**
    @function deleteEmployee
    @param { object } userId
    Function deletes an employee
  */
  public static async deleteEmployee(userId: any) {
    try {
      const payload: any = await EmployeeModel.findById({ _id: userId });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getYearOfJoining
    @param { object } empId
    Function returns year of joining by empId
  */
  public static async getYearOfJoining(empId: any) {
    try {
      const payload: any = await EmployeeModel.findOne({
        empId: empId,
        isDeleted: false,
        isActive: true
      });
      return payload.yearOfJoining;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default Employees;
