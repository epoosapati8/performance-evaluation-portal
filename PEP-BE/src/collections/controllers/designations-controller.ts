import DesignationService from '../services/designations-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class DesignationController extends Controller {
  constructor() {
    super();
  }
  public static async createDesignation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const result: any = await DesignationService.createDesignation(body);
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  public static async getDesignation(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await DesignationService.getDesignation();
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
  public static async getAllDesignation(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await DesignationService.getAllDesignation();
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.noContent(res);
    }
  }
}
export default DesignationController;
