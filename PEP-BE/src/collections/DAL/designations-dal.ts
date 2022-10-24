import DAL_ERROR from '../../commons/dal-error';
import DesignationService from '../services/designations-service';
import DesignationModel from '../models/designations-model';
import { resourceLimits } from 'node:worker_threads';
class Designation {
  public static async createDesignation(payload: any) {
    try {
      const result = await DesignationService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  public static async getDesignation() {
    try {
      return await DesignationModel.find({ isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  public static async getAllDesignation() {
    try {
      const array: any = await DesignationService.getDesignation();
      const list: any = array.map((data: any, id: any) => {
        return data.designation;
      });
      return list;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default Designation;
