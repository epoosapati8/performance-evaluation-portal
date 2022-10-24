import EmployeeDal from '../DAL/employees-dal';
import EmployeeModel from '../models/employees-model';
class EmployeeService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding a Employee
  */
  public static async createPayload(payload: any) {
    return new EmployeeModel({
      name: payload.name,
      role: payload.role,
      phoneNumber: payload.phoneNumber,
      yearOfJoining: payload.yearOfJoining,
      empId: payload.empId,
      designation: payload.designation
    });
  }
  /**
    @function getEmployeesById
    @param { object } id
    Function returns an employee by id
  */
  public static async getEmployeesById(userId: any) {
    return EmployeeDal.getEmployeesById(userId);
  }

  /**
    @function getEmployeesByEmpId
    @param { object } empid
    Function returns employee by empid
  */
  public static async getEmployeesByEmpId(empId: any) {
    return EmployeeDal.getEmployeesByEmpId(empId);
  }

  /**
    @function createEmployee
    @param { object } body
    Function creates a new Employee
  */
  public static async createEmployee(body: any) {
    return EmployeeDal.createEmployee(body);
  }
  /**
    @function getAllEmployees
    @param { object } body
    Function gets all employees
  */
  public static async getAllEmployees() {
    return EmployeeDal.getAllEmployees();
  }
  /**
    @function updateEmployee
    @param { object } userId    @param { object } payload
    Function updates an employee.
  */
  public static async updateEmployee(userId: any, payload: any) {
    return await EmployeeDal.updateEmployee(userId, payload);
  }
  /**
    @function deleteEmployee
    @param { object } id
    Function DELETES an Employee by id.
  */
  public static async deleteEmployee(id: any) {
    return EmployeeDal.deleteEmployee(id);
  }
  /**
    @function getYearOfJoining
    @param { object } empId
    Function returns year of joining by id
  */
  public static async getYearOfJoining(empId: any) {
    return EmployeeDal.getYearOfJoining(empId);
  }
}
export default EmployeeService;
