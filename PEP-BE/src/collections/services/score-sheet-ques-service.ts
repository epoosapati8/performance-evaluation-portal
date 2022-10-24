import ScoreSheetQuesDal from '../DAL/score-sheet-ques-dal';
import ScoreSheetQuesModel from '../models/score-sheet-ques-models';
import Transporter from '../services/notification-service';
import UserService from '../services/users-service';
import * as moment from 'moment';
class ScoreSheetQuesService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding score sheet questions.
  */
  public static async createPayload(payload: any) {
    return new ScoreSheetQuesModel({
      year: payload.year,
      quarter: payload.quarter,
      questions: payload.questions,
      startDate: moment(payload.startDate, 'DD/MM/YYYY').utc().format(),
      endDate: moment(payload.endDate, 'DD/MM/YYYY').add(1, 'd').utc().format()
    });
  }
  /**
    @function getScoreSheetQues
    @param { object } year
    @param { object } quarter
    Function returns score sheet questions by year and quarter.
  */
  public static async getScoreSheetQues(year: any, quarter: any) {
    return ScoreSheetQuesDal.getScoreSheetQues(year, quarter);
  }
  /**
    @function getStatus
    @param { object } year
    @param { object } quarter
    Function returns the status of score sheet questions.
  */
  public static async getStatus(year: any, quarter: any) {
    return ScoreSheetQuesDal.getStatus(year, quarter);
  }

  /**
    @function createScoreSheetQues
    @param { object } body
    Function creates score sheet questions.
  */
  public static async createScoreSheetQues(body: any) {
    try {
      const result: any = await ScoreSheetQuesDal.createScoreSheetQues(body);
      const array: any = await UserService.getAllUsers();
      const list: any = array.map((data: any, id: any) => {
        return data.email;
      });
      const start: any = moment(result.startDate).format('MMMM Do YYYY');
      const end: any = moment(result.endDate).subtract(1, 'd').format('MMMM Do YYYY');
      const subject: any = 'Score Sheet for ' + result.year + ' ' + result.quarter;
      const message: any =
        'Score Sheet for the year ' +
        result.year +
        ' quarter ' +
        result.quarter +
        ' is live from ' +
        start +
        ' to ' +
        end +
        '.';
      Transporter.getMail(list, message, subject);
      const reminderDate: any = moment(result.endDate).subtract(2, 'd').format();
      const reminderSubject: any =
        'Reminder || Score Sheet for ' + result.year + ' ' + result.quarter;
      const reminderMessage: any =
        'This is to remind you that the score sheet for the year ' +
        result.year +
        ' quarter ' +
        result.quarter +
        ' will be closed on ' +
        end +
        '. Kindly submit it before the deadline.\n\nIgnore if already done.';
      // const interviewDate = new Date(2021, 3, 16, 14, 6, 0);
      Transporter.ScheduleMail(list, reminderMessage, reminderSubject, reminderDate);
      return result;
    } catch {
      throw new Error();
    }
  }
  /**
    @function updateScoreSheetQues
    @param { object } id    
    @param { object } payload
    Function updates score sheet questions by id.
  */
  public static async updateScoreSheetQues(id: any, payload: any) {
    return await ScoreSheetQuesDal.updateScoreSheetQues(id, payload);
  }
  /**
    @function deleteScoreSheetQues
    @param { object } id
    Function DELETES score sheet questions by id.
  */
  public static async deleteScoreSheetQues(id: any) {
    return ScoreSheetQuesDal.deleteScoreSheetQues(id);
  }
}
export default ScoreSheetQuesService;
