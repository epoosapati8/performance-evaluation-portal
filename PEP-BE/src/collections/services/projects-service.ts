import ProjectDal from '../DAL/projects-dal';
import ProjectModel from '../models/projects-model';
class ProjectService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding a project
  */
  public static async createPayload(payload: any) {
    const start = payload.startDate.split('/');
    const end = payload.endDate.split('/');

    return new ProjectModel({
      projectId: payload.projectId,
      projectName: payload.projectName,
      managerId: payload.managerId,
      hrId: payload.hrId,
      startDate: new Date(start[2], parseInt(start[1]) - 1, start[0]),
      endDate: new Date(end[2], parseInt(end[1]) - 1, parseInt(end[0]) + 1)
    });
  }

  /**
    @function getProjectByQuarter
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns project by year, quarter and project name
  */
  public static async getProjectByQuarter(year: any, quarter: any, projectName: any) {
    return ProjectDal.getProjectByQuarter(year, quarter, projectName);
  }

  /**
    @function getProjectListByQuarter
    @param { object } year
    @param { object } quarter
    @param { object } managerId
    Function returns projectlist by year, quarter and managerId.
  */
  public static async getProjectListByQuarter(year: any, quarter: any, managerId: any) {
    return ProjectDal.getProjectListByQuarter(year, quarter, managerId);
  }

  /**
    @function getProjectListByHrId
    @param { object } year
    @param { object } quarter
    @param { object } hrId
    Function returns projectlist by year, quarter and hrId.
  */
  public static async getProjectListByHrId(year: any, quarter: any, hrId: any) {
    return ProjectDal.getProjectListByHrId(year, quarter, hrId);
  }

  /**
    @function checkQuarter
    @param { object } year
    @param { object } quarter
    Function returns start date and end date of quarter.
  */
  public static async checkQuarter(year: any, quarter: any) {
    return ProjectDal.checkQuarter(year, quarter);
  }

  /**
    @function getProjectList
    @param { object } year
    @param { object } quarter
    Function returns projectlist by year and quarter
  */
  public static async getProjectList(year: any, quarter: any) {
    return ProjectDal.getProjectList(year, quarter);
  }

  /**
    @function createProject
    @param { object } body
    Function creates a new project
  */
  public static async createProject(body: any) {
    return ProjectDal.createProject(body);
  }
  /**
    @function updateProject
    @param { object } id   
    @param { object } payload
    Function updates a project by id.
  */
  public static async updateProject(id: any, payload: any) {
    return await ProjectDal.updateProject(id, payload);
  }
  /**
    @function deleteProject
    @param { object } id
    Function DELETES a project by id.
  */
  public static async deleteProject(id: any) {
    return ProjectDal.deleteProject(id);
  }
  /**
    @function getManagerIdByProjectName
    @param projectName 
    Function returns managerId by projectName.
   */
  public static async getManagerIdByProjectName(projectName: any) {
    return ProjectDal.getManagerIdByProjectName(projectName);
  }
  /**
    @function getHrIdByProjectName
    @param projectName 
    Function returns hrId by projectName.
   */
  public static async getHrIdByProjectName(projectName: any) {
    return ProjectDal.getHrIdByProjectName(projectName);
  }
}
export default ProjectService;
