import SelfEvalQuesDal from '../DAL/self-eval-ques-dal';
import SelfEvalQuesModel from '../models/self-eval-ques-models';
import UserService from '../services/users-service';
import Transporter from '../services/notification-service';
import * as moment from 'moment';

class SelfEvalQuesService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding self evaluation questions.
  */
  public static async createPayload(payload: any) {
    return new SelfEvalQuesModel({
      year: payload.year,
      quarter: payload.quarter,
      questions: payload.questions,
      startDate: moment(payload.startDate, 'DD/MM/YYYY').utc().format(),
      endDate: moment(payload.endDate, 'DD/MM/YYYY').add(1, 'd').utc().format()
    });
  }
  /**
    @function getSelfEvalQues
    @param { object } year
    @param { object } quarter
    Function returns self evaluation questions by year and quarter.
  */
  public static async getSelfEvalQues(year: any, quarter: any) {
    return SelfEvalQuesDal.getSelfEvalQues(year, quarter);
  }
  /**
    @function getStatus
    @param { object } year
    @param { object } quarter
    Function returns the status of self evaluation questions.
  */
  public static async getStatus(year: any, quarter: any) {
    return SelfEvalQuesDal.getStatus(year, quarter);
  }
  /**
    @function createSelfEvalQues
    @param { object } body
    Function creates self evaluation questions.
  */
  public static async createSelfEvalQues(body: any) {
    try {
      const result: any = await SelfEvalQuesDal.createSelfEvalQues(body);
      const array: any = await UserService.getAllUsers();
      const list: any = array.map((data: any, id: any) => {
        return data.email;
      });
      const start: any = moment(result.startDate).format('MMMM Do YYYY');
      const end: any = moment(result.endDate).subtract(1, 'd').format('MMMM Do YYYY');
      const subject: any = 'Self Assessment Form for ' + result.year + ' ' + result.quarter;
      const message: any =
        'Self Assessment Form for the year ' +
        result.year +
        ' quarter ' +
        result.quarter +
        ' is live from ' +
        start +
        ' to ' +
        end;
      Transporter.getMail(list, message, subject);
      const reminderDate: any = moment(result.endDate).subtract(2, 'd').format();
      const reminderSubject: any =
        'Reminder || Self assessment for ' + result.year + ' ' + result.quarter;
      const reminderMessage: any =
        'This is to remind you that the self assessment for the year ' +
        result.year +
        ' quarter ' +
        result.quarter +
        ' will be closed on ' +
        end +
        '. Kindly submit it before the deadline.\n\nIgnore if already done.';
      Transporter.ScheduleMail(list, reminderMessage, reminderSubject, reminderDate);
      return result;
    } catch {
      throw new Error();
    }
  }
  /**
    @function updateSelfEvalQues
    @param { object } id    @param { object } payload
    Function updates self eval questions using year and quarter from payload.
  */
  public static async updateSelfEvalQues(payload: any) {
    return await SelfEvalQuesDal.updateSelfEvalQues(payload);
  }
  /**
    @function deleteSelfEvalQues
    @param { object } id
    Function DELETES self eval questions by id.
  */
  public static async deleteSelfEvalQues(id: any) {
    return SelfEvalQuesDal.deleteSelfEvalQues(id);
  }
}
export default SelfEvalQuesService;
