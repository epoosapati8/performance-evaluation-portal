import DAL_ERROR from '../../commons/dal-error';
import ScoreSheetAnsService from '../services/score-sheet-ans-service';
import ScoreSheetAnsModel from '../models/score-sheet-ans-model';
import ScoreSheetQuesDal from './score-sheet-ques-dal';
import ProjectDal from './projects-dal';
import { MongooseUpdateQuery, Document } from 'mongoose';
class ScoreSheetAnswers {
  /**
    @function createScoreSheetAns
    @param { object } payload
    Function creates Score Sheet Answers.
  */
  public static async createScoreSheetAns(payload: any) {
    try {
      const result = await ScoreSheetAnsService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /**
    @function getScoreSheetAnsByEmpId
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns Score Sheet Answers by empId, year and quarter
  */
  public static async getScoreSheetAnsByEmpId(empId: any, year: any, quarter: any) {
    try {
      return await ScoreSheetAnsModel.findOne({
        empId: empId,
        year: year,
        quarter: quarter,
        isDeleted: false
      });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getScoreSheetAnsByProject
    @param { object } empId
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns Score Sheet Answers data by empId, year, quarter and project name.
  */
  public static async getScoreSheetAnsByProject(
    empId: any,
    year: any,
    quarter: any,
    projectName: any
  ) {
    try {
      const answer: any = await ScoreSheetAnsModel.findOne({
        empId: empId,
        year: year,
        quarter: quarter,
        projectName: projectName,
        isDeleted: false
      });
      const values = await ScoreSheetAnsModel.find({
        empId: empId,
        year: year,
        quarter: quarter,
        isDeleted: false
      });
      const average = await this.getWeightedAverage(values, year, quarter);
      const question: any = await ScoreSheetQuesDal.getScoreSheetQues(year, quarter);
      return {
        questions: question.questions,
        answers: answer.answers,
        total: answer.total,
        feedback: answer.feedback,
        average,
        duration: answer.duration
      };
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getAvgScoreAnsByProject
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns average of all scores of a particular project
  */
  public static async getAvgScoreAnsByProject(year: any, quarter: any, projectName: any) {
    try {
      const answer: any = await ScoreSheetAnsModel.find({
        year: year,
        quarter: quarter,
        projectName: projectName,
        isDeleted: false
      });
      const managerEmpId = await ProjectDal.getManagerEmpId(projectName);
      const index = answer.findIndex((x) => x.empId === managerEmpId);
      if (index > -1) {
        answer.splice(index, 1);
      }
      const maxScore = 25 * answer[0].answers.length;
      const average = await this.getAverage(answer, year, quarter);
      return { average, maxScore };
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function updateScoreSheetAns
    @param { object } payload
    Function updates Score Sheet Answers
  */
  public static async updateScoreSheetAns(payload: MongooseUpdateQuery<Pick<Document, '_id'>>) {
    try {
      const answer_payload: any = await ScoreSheetAnsModel.findOne({
        empId: payload.empId,
        year: payload.year,
        quarter: payload.quarter,
        projectName: payload.projectName,
        isDeleted: false
      });
      const answer: any = await ScoreSheetAnsModel.findByIdAndUpdate(
        answer_payload._id,
        payload
      ).setOptions({
        new: true,
        overwrite: true
      });
      answer.updatedAt = new Date();
      return answer.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }
  /**
    @function deleteScoreSheetAns
    @param { object } id
    Function deletes score sheet answers
  */
  public static async deleteScoreSheetAns(id: any) {
    try {
      const payload: any = await ScoreSheetAnsModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getAverage
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns average of total scores
  */
  public static async getAverage(values: any, year: any, quarter: any) {
    try {
      const totals = values.map((data: any, id: any) => {
        return parseInt(data.total);
      });
      if (values.length === 0 || totals.length === 0) {
        throw new Error();
      }
      const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
      return parseFloat(avg.toFixed(2));
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getWeightedAverage
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns average of total scores based on duration of projects
  */
  public static async getWeightedAverage(values: any, year: any, quarter: any) {
    try {
      let sum = 0;
      const totals = values.map((data: any, id: any) => {
        sum += parseFloat(data.duration);
        return parseInt(data.total) * parseFloat(data.duration);
      });
      if (values.length === 0 || totals.length === 0) {
        throw new Error();
      }
      const avg = totals.reduce((a, b) => a + b, 0) / sum;
      return parseFloat(avg.toFixed(2));
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default ScoreSheetAnswers;
