import PerfEvalAnsService from '../services/perf-eval-ans-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class PerfEvalAnsController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createPerfEvalAns
      @param { object } req
      @param { object } res
      Function creates Performance Evaluation Answers
    */
  public static async createPerfEvalAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add SelfAssessmentAnswers",
                schema: { $ref: "#/definitions/Addperfevalans" }
        } */
    const { body } = req;
    try {
      const result: any = await PerfEvalAnsService.createPerfEvalAns(body);
      /* #swagger.responses[201] = { 
                    description: 'Performance Evaluation Answers successfully created.',
                    schema: { $ref: "#/definitions/PerfEvalAnsPostResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getPerfEvalAnsByEmpId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns Performance Evaluation Answers by empId.
  */
  public static async getPerfEvalAnsByEmpId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { empId },
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await PerfEvalAnsService.getPerfEvalAnsByEmpId(empId, year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Performance Evaluation Answers successfully obtained using empId .',
                    schema: { $ref: "#/definitions/PerfEvalGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function getSavedProjects
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns saved project names by empId.
  */
  public static async getSavedProjects(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { empId },
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await PerfEvalAnsService.getSavedProjects(empId, year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Saved Projects successfully obtained.',
                    schema: { $ref: "#/definitions/PerfEvalAnsAllResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function getPerfEvalAnsByProject
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns Performance Evaluation Answers by project.
  */
  public static async getPerfEvalAnsByProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { empId },
      params: { year },
      params: { quarter },
      params: { projectName }
    } = req;
    try {
      const result: any = await PerfEvalAnsService.getPerfEvalAnsByProject(
        empId,
        year,
        quarter,
        projectName
      );
      /* #swagger.responses[200] = { 
                    description: 'Performance Evaluation Answers successfully obtained using project name.',
                    schema: { $ref: "#/definitions/PerfEvalAnsGetAllResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function updatePerfEvalAns
    @param { object } req
    @param { object } res
    Function updates Performance Evaluation Answers
  */
  public static async updatePerfEvalAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
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
      const result: any = await PerfEvalAnsService.updatePerfEvalAns(id, body);
      /* #swagger.responses[200] = { 
                    description: 'Performance Evaluation Answers successfully updated.',
                    schema: { $ref: "#/definitions/PerfEvalAnsUpdateResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deletePerfEvalAns
    @param { object } req
    @param { object } res
    Function deletes Performance Evaluation Answers by id.
  */
  public static async deletePerfEvalAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await PerfEvalAnsService.deletePerfEvalAns(id);
      /* #swagger.responses[202] = { 
                    description: 'Performance Evaluation Answers successfully deleted.',
                    schema: { $ref: "#/definitions/PerfEvalAnswerDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default PerfEvalAnsController;
