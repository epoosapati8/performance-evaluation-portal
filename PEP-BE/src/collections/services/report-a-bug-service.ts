import ReportABugDal from '../DAL/report-a-bug-dal';
import ReportABugModel from '../models/report-a-bug-model';
class ReportABugService {
  /**
      @function createPayload
      @param { object } payload
      Function creates payload for adding a bug report
    */
  public static async createPayload(payload: {
    empId: any;
    page: any;
    description: any;
    email: any;
  }) {
    return new ReportABugModel({
      empId: payload.empId,
      email: payload.email,
      page: payload.page,
      description: payload.description
    });
  }

  /**
      @function getBugReport
      @param { object } body
      Function returns bug report.
    */
  public static async getBugReport() {
    return ReportABugDal.getBugReport();
  }

  /**
      @function createBugReport
      @param { object } body
      Function creates a new bug report.
    */
  public static async createBugReport(body: any) {
    return ReportABugDal.createBugReport(body);
  }

  /**
    @function deleteBugReport
    @param { object } id
    Function DELETES a bug report by id.
  */
  public static async deleteBugReport(id: any) {
    return ReportABugDal.deleteBugReport(id);
  }
}

export default ReportABugService;
