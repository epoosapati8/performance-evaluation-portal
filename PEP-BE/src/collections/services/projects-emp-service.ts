import ProjectEmpDal from '../DAL/projects-emp-dal';
import ProjectEmpModel from '../models/projects-emp-model';
class ProjectEmpService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding employees in a project
  */
  public static async createPayload(payload: {
    projectId: any;
    empId: any;
    year: any;
    quarter: any;
  }) {
    return new ProjectEmpModel({
      projectId: payload.projectId,
      empId: payload.empId,
      year: payload.year,
      quarter: payload.quarter
    });
  }
  /**
    @function getProjectEmpByProjectId
    @param { object } id
    Function returns employees in a project
  */
  public static async getProjectEmpByProjectId(id: any, year: any, quarter: any) {
    return ProjectEmpDal.getProjectEmpByProjectId(id, year, quarter);
  }

  /**
    @function getProjectEmpByProjectName
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns employees in a project by year,quarter and project name.
  */
  public static async getProjectEmpByProjectName(year: any, quarter: any, projectName: any) {
    return ProjectEmpDal.getProjectEmpByProjectName(year, quarter, projectName);
  }

  /**
    @function getTotalScore
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns total score of employee
  */
  public static async getTotalScore(year: any, quarter: any, projectName: any) {
    return ProjectEmpDal.getTotalScore(year, quarter, projectName);
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
    return ProjectEmpDal.getTotalScoreByDesignation(year, quarter, projectName, designation);
  }

  /**
    @function getProjectEmpByEmployeeId
    @param { object } employeeId
    Function returns employees in a project by employeeid
  */
  public static async getProjectEmpByEmployeeId(employeeId: any) {
    return ProjectEmpDal.getProjectEmpByEmployeeId(employeeId);
  }

  /**
    @function createprojectemp
    @param { object } body
    Function creates employees in a project
  */
  public static async createProjectEmp(body: any) {
    return ProjectEmpDal.createProjectEmp(body);
  }
  /**
    @function updateProjectEmp
    @param { object } id  
    @param { object } payload
    Function updates employees in a project
  */
  public static async updateProjectEmp(id: any, payload: any) {
    return await ProjectEmpDal.updateProjectEmp(id, payload);
  }
  /**
    @function deleteProjectEmp
    @param { object } id
    Function DELETES employees in a project by id.
  */
  public static async deleteProjectEmp(id: any) {
    return ProjectEmpDal.deleteProjectEmp(id);
  }
}
export default ProjectEmpService;
