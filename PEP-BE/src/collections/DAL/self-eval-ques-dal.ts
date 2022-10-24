import DAL_ERROR from '../../commons/dal-error';
import SelfEvalQuesService from '../services/self-eval-ques-service';
import SelfEvalQuesModel from '../models/self-eval-ques-models';
import { MongooseUpdateQuery, Document } from 'mongoose';
import { fromCallback } from 'bluebird';
import Transporter from '../services/notification-service';
import UserService from '../services/users-service';
class SelfEvalQuestions {
  /**
    @function createSelfEvalQues
    @param { object } payload
    Function creates self evaluation questions.
  */
  public static async createSelfEvalQues(payload: any) {
    try {
      const result = await SelfEvalQuesService.createPayload(payload);
      if (result !== undefined) {
        return result.save();
      } else {
        throw new Error();
      }

      console.log(result);
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }

  /**
    @function getSelfEvalQues
    @param { object } isLive
    @param { object } year
    @param { object } quarter
    Function returns self evaluation questions by year and quarter.
  */
  public static async getSelfEvalQues(year: any, quarter: any) {
    try {
      const question: any = await SelfEvalQuesModel.findOne({
        year: year,
        quarter: quarter,
        isDeleted: false
      });
      if (question === null) {
        throw new Error();
      }
      return question;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getStatus
    @param { object } year
    @param { object } quarter
    Function returns status of self evalution questions.
  */
  public static async getStatus(year: any, quarter: any) {
    try {
      const form: any = await SelfEvalQuesModel.findOne({
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
    @function updateSelfEvalQues
    @param { object } id
    @param { object } payload
    Function updates self evaluation questions using year and quarter from payload.
  */
  public static async updateSelfEvalQues(payload: any) {
    try {
      const questions: any = await SelfEvalQuesModel.findOne({
        year: payload.year,
        quarter: payload.quarter,
        isDeleted: false
      });
      questions.questions = payload.questions;
      questions.year = payload.year;
      questions.quarter = payload.quarter;
      const start = payload.startDate.split('/');
      const end = payload.endDate.split('/');
      (questions.startDate = new Date(start[2], parseInt(start[1]) - 1, start[0])),
        (questions.endDate = new Date(end[2], parseInt(end[1]) - 1, parseInt(end[0]) + 1));
      questions.updatedAt = new Date();
      return questions.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }

  /**
    @function deleteSelfEvalQues
    @param { object } id
    Function deletes self evaluation questions.
  */
  public static async deleteSelfEvalQues(id: any) {
    try {
      const payload: any = await SelfEvalQuesModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default SelfEvalQuestions;
