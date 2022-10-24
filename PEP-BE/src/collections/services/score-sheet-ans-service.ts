import ScoreSheetAnsDal from '../DAL/score-sheet-ans-dal';
import ScoreSheetAnsModel from '../models/score-sheet-ans-model';
import Transporter from '../services/notification-service';
import UserService from '../services/users-service';
import ProjectService from '../services/projects-service';
import EmployeeService from '../services/employees-service';

class ScoreSheetAnsService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding Score Sheet Answers
  */
  public static async createPayload(payload: any) {
    return new ScoreSheetAnsModel({
      empId: payload.empId,
      year: payload.year,
      quarter: payload.quarter,
      answers: payload.answers,
      projectName: payload.projectName,
      total: parseInt(payload.total),
      duration: payload.duration,
      feedback: payload.feedback
    });
  }
  /**
    @function getScoreSheetAnsByEmpId
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns score sheet answers by empId, year and quarter.
  */
  public static async getScoreSheetAnsByEmpId(empId: any, year: any, quarter: any) {
    return ScoreSheetAnsDal.getScoreSheetAnsByEmpId(empId, year, quarter);
  }
  /**
    @function getScoreSheetAnsByProject
    @param { object } empId
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns score sheet answers by empId, year, quarter and project name.
  */
  public static async getScoreSheetAnsByProject(
    empId: any,
    year: any,
    quarter: any,
    projectName: any
  ) {
    return ScoreSheetAnsDal.getScoreSheetAnsByProject(empId, year, quarter, projectName);
  }
  /**
    @function getAvgScoreAnsByProject
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns average of all scores of a particular project
  */
  public static async getAvgScoreAnsByProject(year: any, quarter: any, projectName: any) {
    return ScoreSheetAnsDal.getAvgScoreAnsByProject(year, quarter, projectName);
  }

  /**
    @function createScoreSheetAns
    @param { object } body
    Function creates Score Sheet Answers
  */
  public static async createScoreSheetAns(body: any) {
    const result: any = await ScoreSheetAnsDal.createScoreSheetAns(body);
    const employee_payload: any = await EmployeeService.getEmployeesByEmpId(result.empId);
    const employee_name: any = employee_payload.name;
    const hr_Id: any = await ProjectService.getHrIdByProjectName(result.projectName);
    const email: any = await UserService.getEmailByUserId(hr_Id);
    const subject: any =
      'Score Sheet Submission of ' + result.projectName + ' ' + result.year + ' ' + result.quarter;
    const message: any =
      'Score Sheet of the employee ' +
      employee_name +
      ' for the project ' +
      result.projectName +
      ' has been filled by the manager for the year ' +
      result.year +
      ' quarter ' +
      result.quarter +
      ' .';
    Transporter.getMail(email, message, subject);
    return result;
  }
  /**
    @function updateScoreSheetAns
    @param { object } payload
    Function updates Score Sheet Answers.
  */
  public static async updateScoreSheetAns(payload: any) {
    return await ScoreSheetAnsDal.updateScoreSheetAns(payload);
  }
  /**
    @function deleteScoreSheetAns
    @param { object } id
    Function DELETES Score Sheet Answers by id.
  */
  public static async deleteScoreSheetAns(id: any) {
    return ScoreSheetAnsDal.deleteScoreSheetAns(id);
  }
}
export default ScoreSheetAnsService;
