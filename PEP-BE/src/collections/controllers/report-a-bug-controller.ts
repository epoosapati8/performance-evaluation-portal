import ReportABugService from '../services/report-a-bug-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class ReportABugController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createBugReport
      @param { object } req
      @param { object } res
      Function creates a bug report
    */
  public static async createBugReport(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['BugReports']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add BugReports ",
                schema: { $ref: "#/definitions/AddBugReport" }
        } */
    const { body } = req;
    try {
      const result: any = await ReportABugService.createBugReport(body);
      /* #swagger.responses[201] = { 
                    description: 'Bug report successfully created.',
                    schema: { $ref: "#/definitions/ReportABugResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getBugReport
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a bug report.
  */
  public static async getBugReport(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['BugReports']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    try {
      const result: any = await ReportABugService.getBugReport();
      /* #swagger.responses[200] = { 
                    description: 'Bug report successfully obtained.',
                    schema: { $ref: "#/definitions/ReportABugGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }

  /**
    @function deleteBugReport
    @param { object } req
    @param { object } res
    Function deletes a bug report by id.
  */
  public static async deleteBugReport(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['BugReports']
    /*  #swagger.parameters['authorization'] = {
                  in: 'header',
                  type: "string",
                  description: "Bearer <token>"
          } */
    const {
      params: { id }
    } = req;
    try {
      const result: any = await ReportABugService.deleteBugReport(id);
      /* #swagger.responses[202] = { 
                      description: 'Bug report successfully deleted.',
                      schema: { $ref: "#/definitions/BugReportDeleteResponse" } 
          } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default ReportABugController;
