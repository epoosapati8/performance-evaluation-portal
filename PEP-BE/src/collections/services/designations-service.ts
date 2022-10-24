import DesignationDal from '../DAL/designations-dal';
import DesignationModel from '../models/designations-model';
class DesignationService {
  public static async createPayload(payload: { designation: any }) {
    return new DesignationModel({
      designation: payload.designation
    });
  }
  public static async createDesignation(body: any) {
    return DesignationDal.createDesignation(body);
  }
  public static async getDesignation() {
    return DesignationDal.getDesignation();
  }
  public static async getAllDesignation() {
    return DesignationDal.getAllDesignation();
  }
}
export default DesignationService;
