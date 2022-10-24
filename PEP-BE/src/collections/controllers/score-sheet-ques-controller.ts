import ScoreSheetQuesService from '../services/score-sheet-ques-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class ScoreSheetQuesController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createScoreSheetQues
      @param { object } req
      @param { object } res
      Function creates score sheet questions.
    */
  public static async createScoreSheetQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetQuestions']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add ScoreSheetQuestions",
                schema: { $ref: "#/definitions/AddScoreSheetQues" }
        } */
    const { body } = req;
    try {
      const result: any = await ScoreSheetQuesService.createScoreSheetQues(body);
      /* #swagger.responses[201] = { 
                    description: 'Score sheet questions successfully created.',
                    schema: { $ref: "#/definitions/ScoreSheetQuestion" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getScoreSheetQues
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns score sheet questions.
  */
  public static async getScoreSheetQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetQuestions']
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
      const result: any = await ScoreSheetQuesService.getScoreSheetQues(year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Score sheet questions successfully obtained.',
                    schema: { $ref: "#/definitions/ScoreSheetQuestionGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function getStatus
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns status of score sheet questions.
  */
  public static async getStatus(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetQuestions']
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
      const result: any = await ScoreSheetQuesService.getStatus(year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Status of Score sheet questions obtained.',
                    schema: { $ref: "#/definitions/ScoreSheetQuestionStatusResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  /**
    @function updateScoreSheetQues
    @param { object } req
    @param { object } res
    Function updates score sheet questions.
  */
  public static async updateScoreSheetQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetQuestions']
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
      const result: any = await ScoreSheetQuesService.updateScoreSheetQues(id, body);
      /* #swagger.responses[200] = { 
                    description: 'Score sheet questions successfully updated.',
                    schema: { $ref: "#/definitions/ScoreSheetUpdateQuestion" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteScoreSheetQues
    @param { object } req
    @param { object } res
    Function deletes score sheet questions by id.
  */
  public static async deleteScoreSheetQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['ScoreSheetQuestions']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await ScoreSheetQuesService.deleteScoreSheetQues(id);
      /* #swagger.responses[202] = { 
                    description: 'Score sheet questions successfully deleted.',
                    schema: { $ref: "#/definitions/ScoreSheetQuesDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default ScoreSheetQuesController;
