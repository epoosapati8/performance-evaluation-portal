import PerfEvalAnsDal from '../DAL/perf-eval-ans-dal';
import PerfEvalAnsModel from '../models/perf-eval-ans-model';
import Transporter from '../services/notification-service';
import UserService from '../services/users-service';
import ProjectService from '../services/projects-service';
import EmployeeService from '../services/employees-service';

class PerfEvalAnsService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding Performance Evaluation Answers
  */
  public static async createPayload(payload: any) {
    return new PerfEvalAnsModel({
      email: payload.email,
      empId: payload.empId,
      year: payload.year,
      quarter: payload.quarter,
      answers: payload.answers,
      projectName: payload.projectName
    });
  }
  /**
    @function getPerfEvalAnsByEmpId
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns performance evaluation answers by empId
  */
  public static async getPerfEvalAnsByEmpId(empId: any, year: any, quarter: any) {
    return PerfEvalAnsDal.getPerfEvalAnsByEmpId(empId, year, quarter);
  }
  /**
    @function getSavedProjects
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns saved project names by empId, year and quarter
  */
  public static async getSavedProjects(empId: any, year: any, quarter: any) {
    return PerfEvalAnsDal.getSavedProjects(empId, year, quarter);
  }
  /**
    @function getAllowedDomainByProject
    @param { object } empId
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns performance evaluation answers by empId, year, quarter and projectName
  */
  public static async getPerfEvalAnsByProject(
    empId: any,
    year: any,
    quarter: any,
    projectName: any
  ) {
    return PerfEvalAnsDal.getPerfEvalAnsByProject(empId, year, quarter, projectName);
  }

  /**
    @function createPerfEvalAns
    @param { object } body
    Function creates Performance Evaluation Answers
  */
  public static async createPerfEvalAns(body: any) {
    const result: any = await PerfEvalAnsDal.createPerfEvalAns(body);
    const employee_payload: any = await EmployeeService.getEmployeesByEmpId(result.empId);
    const employee_name: any = employee_payload.name;
    const manager_Id: any = await ProjectService.getManagerIdByProjectName(result.projectName);
    const email: any = await UserService.getEmailByUserId(manager_Id);
    const subject: any =
      'Self Assessment Submission of ' +
      result.projectName +
      ' ' +
      result.year +
      ' ' +
      result.quarter;
    const message: any =
      'Self Assessment Form has been filled by the employee ' +
      employee_name +
      ' for the year ' +
      result.year +
      ' quarter ' +
      result.quarter +
      '.';
    Transporter.getMail(email, message, subject);
    return result;
  }
  /**
    @function updatePerfEvalAns
    @param { object } id    
    @param { object } payload
    Function updates Performance Evaluation Answers
  */
  public static async updatePerfEvalAns(id: any, payload: any) {
    return await PerfEvalAnsDal.updatePerfEvalAns(id, payload);
  }
  /**
    @function deletePerfEvalAns
    @param { object } id
    Function DELETES Performance Evaluation Answers by id.
  */
  public static async deletePerfEvalAns(id: any) {
    return PerfEvalAnsDal.deletePerfEvalAns(id);
  }
}
export default PerfEvalAnsService;
