import ProjectEmpService from '../services/projects-emp-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class ProjectEmpController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createProjectEmp
      @param { object } req
      @param { object } res
      Function creates employees in a project
    */
  public static async createProjectEmp(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add ProjectsEmployees",
                schema: { $ref: "#/definitions/Addprojectemployee" }
        } */
    const { body } = req;
    try {
      const result: any = await ProjectEmpService.createProjectEmp(body);
      /* #swagger.responses[201] = { 
                    description: 'Project-Employee mapping successfully created.',
                    schema: { $ref: "#/definitions/ProjectEmpResponse" } 
        } */

      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getProjectEmpByProjectId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns employees in a project by id, year and quarter.
  */
  public static async getProjectEmpByProjectId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id },
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await ProjectEmpService.getProjectEmpByProjectId(id, year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Project-Employee mapping successfully obtained using projectid.',
                    schema: { $ref: "#/definitions/ProjectEmpGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getProjectEmpByProjectName
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns employees in a project by year, quarter and project name
  */
  public static async getProjectEmpByProjectName(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { year },
      params: { quarter },
      params: { projectName }
    } = req;
    try {
      const result: any = await ProjectEmpService.getProjectEmpByProjectName(
        year,
        quarter,
        projectName
      );
      /* #swagger.responses[200] = { 
                    description: 'Project-Employee mapping successfully obtained using project name.',
                    schema: { $ref: "#/definitions/ProjectEmpGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getTotalScore
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns total score of an employee
  */
  public static async getTotalScore(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                  in: 'header',
                  type: "string",
                  description: "Bearer <token>"
          } */
    const {
      params: { year },
      params: { quarter },
      params: { projectName }
    } = req;
    try {
      const result: any = await ProjectEmpService.getTotalScore(year, quarter, projectName);
      /* #swagger.responses[200] = { 
                      description: 'Total score of all employees in a project successfully obtained.',
                      schema: { $ref: "#/definitions/ProjectTotalGetResponse" } 
          } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getTotalScoreByDesignation
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns total score of an employee by designation.
  */
  public static async getTotalScoreByDesignation(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                    in: 'header',
                    type: "string",
                    description: "Bearer <token>"
            } */
    const {
      params: { year },
      params: { quarter },
      params: { projectName },
      params: { designation }
    } = req;
    try {
      const result: any = await ProjectEmpService.getTotalScoreByDesignation(
        year,
        quarter,
        projectName,
        designation
      );
      /* #swagger.responses[200] = { 
                        description: 'Total Score of the Employee successfully obtained.',
                        schema: { $ref: "#/definitions/ProjectTotalGetResponse" } 
            } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getProjectByEmployeeId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns employee in a project by employeeid.
  */
  public static async getProjectEmpByEmployeeId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { employeeId }
    } = req;
    try {
      const result: any = await ProjectEmpService.getProjectEmpByEmployeeId(employeeId);
      /* #swagger.responses[200] = { 
                    description: 'Project-Employee mapping successfully obtained using employeeid.',
                    schema: { $ref: "#/definitions/ProjectEmpGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function updateProjectEmp
    @param { object } req
    @param { object } res
    Function updates employees in a project by id.
  */
  public static async updateProjectEmp(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      body,
      params: { id }
    } = req;
    try {
      const result: any = await ProjectEmpService.updateProjectEmp(id, body);
      /* #swagger.responses[200] = { 
                    description: 'Project-Employee mapping updated .',
                    schema: { $ref: "#/definitions/projectEmpUpdateResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteProject
    @param { object } req
    @param { object } res
    Function deletes employees in a project by id.
  */
  public static async deleteProjectEmp(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ProjectsEmployees']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await ProjectEmpService.deleteProjectEmp(id);
      /* #swagger.responses[202] = { 
                    description: ' Project-Employee mapping successfully deleted.',
                    schema: { $ref: "#/definitions/ProjectEmpDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default ProjectEmpController;
