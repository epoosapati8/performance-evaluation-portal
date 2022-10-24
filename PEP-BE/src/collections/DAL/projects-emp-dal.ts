import DAL_ERROR from '../../commons/dal-error';
import ProjectEmpService from '../services/projects-emp-service';
import ProjectService from '../services/projects-service';
import ProjectEmpModel from '../models/projects-emp-model';
import ScoreSheetAnsService from '../services/score-sheet-ans-service';
import EmployeeService from '../services/employees-service';
import UserService from '../services/users-service';
import { MongooseUpdateQuery, Document } from 'mongoose';
import { any } from 'bluebird';
class ProjectsEmp {
  /**
    @function createProject
    @param { object } payload
    Function creates employees in a project
  */
  public static async createProjectEmp(payload: any) {
    try {
      const result = await ProjectEmpService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }

  /**
    @function getProjectEmpByProjectName
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns employees in a project by year, quarter and project name
  */
  public static async getProjectEmpByProjectName(year: any, quarter: any, projectName: any) {
    try {
      const payload: any = await ProjectService.getProjectByQuarter(year, quarter, projectName);
      const array: any = await ProjectEmpService.getProjectEmpByProjectId(
        payload[0],
        year,
        quarter
      );
      const list = array.map((data: any, id: any) => {
        return {
          empId: data.empId.empId,
          empName: data.empId.name,
          empRole: data.empId.designation
        };
      });
      if (list.length === 0) {
        throw new Error();
      }
      return list;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getProjectEmpByProjectId
    @param { object } projectId
    Function returns employees in a project
  */
  public static async getProjectEmpByProjectId(id: any, year: any, quarter: any) {
    try {
      return await ProjectEmpModel.find({
        projectId: id,
        year: year,
        quarter: quarter,
        isDeleted: false
      }).populate('empId');
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getTotalScore
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns total score of employee
  */
  public static async getTotalScore(year: any, quarter: any, projectName: any) {
    try {
      const array: any = await ProjectEmpService.getProjectEmpByProjectName(
        year,
        quarter,
        projectName
      );
      const list: any = await Promise.all(
        array.map(async (data: any, id: any) => {
          const payload: any = await ScoreSheetAnsService.getScoreSheetAnsByProject(
            data.empId,
            year,
            quarter,
            projectName
          );
          const details: any = await EmployeeService.getEmployeesByEmpId(data.empId);
          const email: any = await UserService.getEmailById(details._id);
          if (payload.total === undefined) {
            payload.total = 'NA';
          }
          const emp_payload: any = {
            empId: data.empId,
            empName: data.empName,
            empRole: data.empRole,
            total: payload.total,
            emailId: email
          };
          return await emp_payload;
        })
      );
      if (list.length === 0) {
        throw new Error();
      }
      return list;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getTotalScoreByDesignation
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    @param { object } designation
    Function returns total score of employee by designation
  */
  public static async getTotalScoreByDesignation(
    year: any,
    quarter: any,
    projectName: any,
    designation: any
  ) {
    try {
      const array: any = await ProjectEmpService.getTotalScore(year, quarter, projectName);
      const list: any = [];
      const payload: any = array.map((data: any, id: any) => {
        if (data.empRole === designation) {
          list.push(data);
        }
      });
      if (list.length === 0) {
        throw new Error();
      }
      return list;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getProjectEmpByEmployeeId
    @param { object } 
    Function returns employees in a project by employeeid
  */
  public static async getProjectEmpByEmployeeId(employeeId: any) {
    try {
      return await ProjectEmpModel.find({ employeeId: employeeId, isDeleted: false });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function updateProject
    @param { object } id
    @param { object } payload
    Function updates employees in a project
  */
  public static async updateProjectEmp(
    id: any,
    payload: MongooseUpdateQuery<Pick<Document, '_id'>>
  ) {
    try {
      const emp_payload: any = await ProjectEmpModel.findByIdAndUpdate(id, payload).setOptions({
        new: true,
        overwrite: true
      });
      emp_payload.updatedAt = new Date();
      return emp_payload.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }

  /**
    @function deleteProjectEmp
    @param { object } id
    Function deletes employees in a project
  */
  public static async deleteProjectEmp(id: any) {
    try {
      const payload: any = await ProjectEmpModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default ProjectsEmp;
