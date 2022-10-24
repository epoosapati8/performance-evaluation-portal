import SelfEvalQuesService from '../services/self-eval-ques-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class SelfEvalQuesController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createSelfEvalQues
      @param { object } req
      @param { object } res
      Function creates self evaluation questions.
    */
  public static async createSelfEvalQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentQuestions']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add SelfAssessmentQuestions",
                schema: { $ref: "#/definitions/Addselfevalques" }
        } */
    const { body } = req;
    try {
      const result: any = await SelfEvalQuesService.createSelfEvalQues(body);
      /* #swagger.responses[201] = { 
                    description: 'Self evaluation questions successfully created.',
                    schema: { $ref: "#/definitions/SelfEvalPostResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getSelfEvalQues
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns self evaluation questions by year and quarter.
  */
  public static async getSelfEvalQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentQuestions']
    const {
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await SelfEvalQuesService.getSelfEvalQues(year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Self evaluation questions successfully obtained using year and quarter.',
                    schema: { $ref: "#/definitions/SelfEvalGetQuestionResponse" } 
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
    Function returns status of self evaluation questions.
  */
  public static async getStatus(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentQuestions']
    const {
      params: { year },
      params: { quarter }
    } = req;
    try {
      const result: any = await SelfEvalQuesService.getStatus(year, quarter);
      /* #swagger.responses[200] = { 
                    description: 'Status of self evaluation questions obtained.',
                    schema: { $ref: "#/definitions/SelfEvalStatusResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function updateSelfEvalQues
    @param { object } req
    @param { object } res
    Function updates self evaluation questions using year and quarter from payload.
  */
  public static async updateSelfEvalQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentQuestions']
    const { body } = req;
    try {
      const result: any = await SelfEvalQuesService.updateSelfEvalQues(body);
      /* #swagger.responses[200] = { 
                    description: 'Self evaluation questions successfully Updated.',
                    schema: { $ref: "#/definitions/SelfEvalQuestionUpdatedResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteSelfEvalQues
    @param { object } req
    @param { object } res
    Function deletes self evaluation questions by id.
  */
  public static async deleteSelfEvalQues(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['SelfAssessmentQuestions']
    const {
      params: { id }
    } = req;
    try {
      const result: any = await SelfEvalQuesService.deleteSelfEvalQues(id);
      /* #swagger.responses[202] = { 
                    description: 'Self evaluation questions successfully deleted.',
                    schema: { $ref: "#/definitions/SelfEvalQuesDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default SelfEvalQuesController;
