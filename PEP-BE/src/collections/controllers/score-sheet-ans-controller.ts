import ScoreSheetAnsService from '../services/score-sheet-ans-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class ScoreSheetAnsController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createScoreSheetAns
      @param { object } req
      @param { object } res
      Function creates Score Sheet Answers
    */
  public static async createScoreSheetAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add ScoreSheetAnswers",
                schema: { $ref: "#/definitions/AddScoreSheetAns" }
        } */
    const { body } = req;
    try {
      const result: any = await ScoreSheetAnsService.createScoreSheetAns(body);
      /* #swagger.responses[201] = { 
                    description: 'Score sheet answers successfully created.',
                    schema: { $ref: "#/definitions/ScoreSheetAnswer" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getScoreSheetAnsByEmpId
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns Score Sheet Answers by empId, year and quarter.
  */
  public static async getScoreSheetAnsByEmpId(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
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
      const result: any = await ScoreSheetAnsService.getScoreSheetAnsByEmpId(empId, year, quarter);
      return ResponseStatus.success(res, result);
      /* #swagger.responses[200] = { 
                    description: 'Score sheet answers successfully obtained using empid.',
                    schema: { $ref: "#/definitions/ScoreSheetGetByIdResponse" } 
        } */
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function getScoreSheetAnsByProject
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns Score Sheet Answers by empId, year, quarter and project name.
  */
  public static async getScoreSheetAnsByProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
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
      const result: any = await ScoreSheetAnsService.getScoreSheetAnsByProject(
        empId,
        year,
        quarter,
        projectName
      );
      /* #swagger.responses[200] = { 
                    description: 'Score sheet answers successfully obtained using project name.',
                    schema: { $ref: "#/definitions/ScoreSheetAnsByProject" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function getAvgScoreAnsByProject
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns average of all scores of a particular project
  */
  public static async getAvgScoreAnsByProject(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
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
      const result: any = await ScoreSheetAnsService.getAvgScoreAnsByProject(
        year,
        quarter,
        projectName
      );
      /* #swagger.responses[200] = { 
                    description: 'Average of all scores of a project successfully obtained.',
                    schema: { $ref: "#/definitions/ScoreSheetAnsAverageResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function updateScoreSheetAns
    @param { object } req
    @param { object } res
    Function updates Score Sheet Answers
  */
  public static async updateScoreSheetAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const { body } = req;
    try {
      const result: any = await ScoreSheetAnsService.updateScoreSheetAns(body);
      /* #swagger.responses[200] = { 
                    description: 'Score sheet answers successfully updated.',
                    schema: { $ref: "#/definitions/ScoreSheetAnswerUpdateResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteScoreSheetAns
    @param { object } req
    @param { object } res
    Function deletes Score Sheet Answers by id.
  */
  public static async deleteScoreSheetAns(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetAnswers']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await ScoreSheetAnsService.deleteScoreSheetAns(id);
      /* #swagger.responses[202] = { 
                    description: 'Score sheet answers successfully deleted.',
                    schema: { $ref: "#/definitions/ScoreSheetAnswerDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default ScoreSheetAnsController;
