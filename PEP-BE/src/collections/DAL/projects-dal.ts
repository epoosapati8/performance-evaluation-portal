import DAL_ERROR from '../../commons/dal-error';
import ProjectService from '../services/projects-service';
import ProjectModel from '../models/projects-model';
import EmployeeService from '../services/employees-service';
import EmployeeDal from './employees-dal';
import { MongooseUpdateQuery, Document } from 'mongoose';
import UserService from '../services/users-service';

class Projects {
  /**
    @function createProject
    @param { object } payload
    Function creates a project
  */
  public static async createProject(payload: any) {
    try {
      const result = await ProjectService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /**
    @function getProjectByQuarter
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns project data by year,quarter and project name
  */
  public static async getProjectByQuarter(year: any, quarter: any, projectName: any) {
    try {
      const Dates: any = await ProjectService.checkQuarter(year, quarter);
      const payload: any = await ProjectModel.find({
        projectName: projectName,
        isDeleted: false
      });
      const array: any = [];
      const list: any = payload.map((data: any, id: any) => {
        if (
          (data.startDate >= Dates.startDate && data.startDate < Dates.endDate) ||
          (data.startDate <= Dates.startDate && data.endDate > Dates.startDate)
        ) {
          array.push(data._id);
        }
      });
      if (array.length === 0) {
        throw new Error();
      }
      return array;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getProjectListByQuarter
    @param { object } year
    @param { object } quarter
    @param { object } managerId
    Function returns project list of manager by year, quarter and manager id.
  */
  public static async getProjectListByQuarter(year: any, quarter: any, managerId: any) {
    try {
      const Dates: any = await ProjectService.checkQuarter(year, quarter);
      const emp_payload: any = await EmployeeService.getEmployeesByEmpId(managerId);
      const payload: any = await ProjectModel.find({
        managerId: emp_payload._id,
        isDeleted: false
      });
      const array: any = [];
      const list: any = payload.map((data: any, id: any) => {
        if (
          (data.startDate >= Dates.startDate && data.startDate < Dates.endDate) ||
          (data.startDate <= Dates.startDate && data.endDate > Dates.startDate)
        ) {
          array.push(data.projectName);
        }
      });
      if (array.length === 0) {
        throw new Error();
      }
      return array;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getProjectListByHrId
    @param { object } year
    @param { object } quarter
    @param { object } hrId
    Function returns project list by year, quarter and hrId.
  */
  public static async getProjectListByHrId(year: any, quarter: any, hrId: any) {
    try {
      const Dates: any = await ProjectService.checkQuarter(year, quarter);
      const emp_payload: any = await EmployeeService.getEmployeesByEmpId(hrId);
      const payload: any = await ProjectModel.find({
        hrId: emp_payload._id,
        isDeleted: false
      });
      const array: any = [];
      const list: any = payload.map((data: any, id: any) => {
        if (
          (data.startDate >= Dates.startDate && data.startDate < Dates.endDate) ||
          (data.startDate <= Dates.startDate && data.endDate > Dates.startDate)
        ) {
          array.push(data.projectName);
        }
      });
      if (array.length === 0) {
        throw new Error();
      }
      return array;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function checkQuarter
    @param { object } year
    @param { object } quarter
    Function returns start date and end date for a quarter.
  */
  public static async checkQuarter(year: any, quarter: any) {
    try {
      if (quarter === 'Q1') {
        const startDate: any = new Date(year, 0, 1);
        const endDate: any = new Date(year, 2, 32);
        return {
          startDate: startDate,
          endDate: endDate
        };
      }

      if (quarter === 'Q2') {
        const startDate: any = new Date(year, 3, 1);
        const endDate: any = new Date(year, 5, 31);
        return {
          startDate: startDate,
          endDate: endDate
        };
      }

      if (quarter === 'Q3') {
        const startDate: any = new Date(year, 6, 1);
        const endDate: any = new Date(year, 8, 32);
        return {
          startDate: startDate,
          endDate: endDate
        };
      }

      if (quarter === 'Q4') {
        const startDate: any = new Date(year, 9, 1);
        const endDate: any = new Date(year, 11, 32);
        return {
          startDate: startDate,
          endDate: endDate
        };
      }
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getProjectList
    @param { object } year
    @param { object } quarter
    Function returns project list
  */
  public static async getProjectList(year: any, quarter: any) {
    try {
      const Dates: any = await ProjectService.checkQuarter(year, quarter);
      const payload: any = await ProjectModel.find({
        isDeleted: false
      });
      const array: any = [];
      const list: any = payload.map((data: any, id: any) => {
        if (
          (data.startDate >= Dates.startDate && data.startDate < Dates.endDate) ||
          (data.startDate <= Dates.startDate && data.endDate > Dates.startDate)
        ) {
          array.push(data.projectName);
        }
      });
      if (array.length === 0) {
        throw new Error();
      }
      return array;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function updateProject
    @param { object } id
    @param { object } payload
    Function updates a project
  */
  public static async updateProject(id: any, payload: MongooseUpdateQuery<Pick<Document, '_id'>>) {
    try {
      const project: any = await ProjectModel.findByIdAndUpdate(id, payload).setOptions({
        new: true,
        overwrite: true
      });
      project.updatedAt = new Date();
      return project.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }

  /**
    @function deleteProject
    @param { object } id
    Function deletes a project
  */
  public static async deleteProject(id: any) {
    try {
      const payload: any = await ProjectModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getManagerEmpId
    @param { object } projectName
    Function retrieves the empId of the manager using project name
  */
  public static async getManagerEmpId(projectName: any) {
    try {
      const payload: any = await ProjectModel.findOne({
        projectName: projectName,
        isDeleted: false
      });
      const emp_payload: any = await EmployeeDal.getEmployeesById(payload.managerId);
      return emp_payload.empId;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  public static async getManagerIdByProjectName(projectName: any) {
    try {
      const payload: any = await ProjectModel.findOne({
        projectName: projectName,
        isDeleted: false
      });
      return payload.managerId;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  public static async getHrIdByProjectName(projectName: any) {
    try {
      const payload: any = await ProjectModel.findOne({
        projectName: projectName,
        isDeleted: false
      });
      return payload.hrId;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default Projects;
