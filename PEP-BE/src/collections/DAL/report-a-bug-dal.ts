import DAL_ERROR from '../../commons/dal-error';
import ReportABugService from '../services/report-a-bug-service';
import ReportABugModel from '../models/report-a-bug-model';
class ReportABug {
  /**
    @function createBugReport
    @param { object } payload
    Function creates a bug report
  */
  public static async createBugReport(payload: any) {
    try {
      const result = await ReportABugService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }

  /**
    @function getBugReport
    Function returns all bugs.
 */
  public static async getBugReport() {
    try {
      return await ReportABugModel.find({ isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function deleteBugReport
    @param { object } id
    Function deletes a bug report by id
  */
  public static async deleteBugReport(id: any) {
    try {
      const payload: any = await ReportABugModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}

export default ReportABug;
