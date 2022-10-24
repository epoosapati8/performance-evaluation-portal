import ProjectService from '../services/projects-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class ProjectController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createProject
      @param { object } req
      @param { object } res
      Function creates a project
    */
  public static async createProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add Projects",
                schema: { $ref: "#/definitions/Addproject" }
        } */
    const { body } = req;
    try {
      const result: any = await ProjectService.createProject(body);
      /* #swagger.responses[201] = { 
                    description: 'Project created successfully.',
                    schema: { $ref: "#/definitions/ProjectResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getProjectByQuarter
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a project by quarter.
  */
  public static async getProjectByQuarter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
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
      const result: any = await ProjectService.getProjectByQuarter(year, quarter, projectName);
      /* #swagger.responses[200] = { 
                    description: 'Project successfully obtained using quarter.',
                    schema: { $ref: "#/definitions/ProjectGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getProjectListByQuarter
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a project list by year, quarter and managerId.
  */
  public static async getProjectListByQuarter(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { year },
      params: { quarter },
      params: { managerId }
    } = req;
    try {
      const result: any = await ProjectService.getProjectListByQuarter(year, quarter, managerId);
      /* #swagger.responses[200] = { 
                    description: 'Project list of manager successfully obtained using quarter.',
                    schema: { $ref: "#/definitions/ProjectManagerResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getProjectListByHrId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a project list by year, quarter and hrId.
  */
  public static async getProjectListByHrId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
    /*  #swagger.parameters['authorization'] = {
                  in: 'header',
                  type: "string",
                  description: "Bearer <token>"
          } */
    const {
      params: { year },
      params: { quarter },
      params: { hrId }
    } = req;
    try {
      const result: any = await ProjectService.getProjectListByHrId(year, quarter, hrId);
      /* #swagger.responses[200] = { 
                    description: 'Project list of hr successfully obtained.',
                    schema: { $ref: "#/definitions/ProjectHrResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function getProjectList
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a project list by year and quarter.
  */
  public static async getProjectList(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await ProjectService.getProjectList(year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Project list successfully obtained.',
                    schema: { $ref: "#/definitions/ProjectGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function updateProject
    @param { object } req
    @param { object } res
    Function updates a project by id.
  */
  public static async updateProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
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
      const result: any = await ProjectService.updateProject(id, body);
      /* #swagger.responses[200] = { 
                    description: 'Project successfully Updated.',
                    schema: { $ref: "#/definitions/projectUpdateResponse"} 
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
    Function deletes a project by id.
  */
  public static async deleteProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Projects']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await ProjectService.deleteProject(id);
      /* #swagger.responses[202] = { 
                    description: 'Project successfully deleted.',
                    schema: { $ref: "#/definitions/ProjectDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default ProjectController;
