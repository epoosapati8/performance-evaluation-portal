import DAL_ERROR from '../../commons/dal-error';
import ScoreSheetQuesService from '../services/score-sheet-ques-service';
import ScoreSheetQuesModel from '../models/score-sheet-ques-models';
import { MongooseUpdateQuery, Document } from 'mongoose';
import UserService from '../services/users-service';
import Transporter from '../services/notification-service';
class ScoreSheetQuestions {
  /**
    @function createScoreSheetQues
    @param { object } payload
    Function creates score sheet questions.
  */
  public static async createScoreSheetQues(payload: any) {
    try {
      const result = await ScoreSheetQuesService.createPayload(payload);
      if (result !== undefined) {
        return result.save();
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /**
    @function getScoreSheetQues
    @param { object } year
    @param { object } quarter
    Function returns score sheet questions by year and quarter.
  */
  public static async getScoreSheetQues(year: any, quarter: any) {
    try {
      const questions = await ScoreSheetQuesModel.findOne({
        year: year,
        quarter: quarter,
        isDeleted: false
      });
      if (questions === null) {
        throw new Error();
      } else {
        return questions;
      }
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getStatus
    @param { object } year
    @param { object } quarter
    Function returns status of score sheet questions by year and quarter.
  */
  public static async getStatus(year: any, quarter: any) {
    try {
      const form: any = await ScoreSheetQuesModel.findOne({
        year: year,
        quarter: quarter,
        isDeleted: false
      });
      if (form === undefined) {
        throw new Error();
      }
      const currentDate = new Date();
      if (currentDate >= form.startDate && currentDate <= form.endDate) {
        return { isLive: true };
      } else {
        return { isLive: false };
      }
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function updateScoreSheetQues
    @param { object } id
    @param { object } payload
    Function updates score sheet questions by id.
  */
  public static async updateScoreSheetQues(
    id: any,
    payload: MongooseUpdateQuery<Pick<Document, '_id'>>
  ) {
    try {
      const questions: any = await ScoreSheetQuesModel.findByIdAndUpdate(id, payload).setOptions({
        new: true,
        overwrite: true
      });
      questions.updatedAt = new Date();
      return questions.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }
  /**
    @function deleteScoreSheetQues
    @param { object } id
    Function deletes score sheet questions by id.
  */
  public static async deleteScoreSheetQues(id: any) {
    try {
      const payload: any = await ScoreSheetQuesModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default ScoreSheetQuestions;
