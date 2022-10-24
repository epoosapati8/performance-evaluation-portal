import DAL_ERROR from '../../commons/dal-error';
import PerfEvalAnsService from '../services/perf-eval-ans-service';
import PerfEvalAnsModel from '../models/perf-eval-ans-model';
import SelfEvalQuesDal from './self-eval-ques-dal';
import { MongooseUpdateQuery, Document } from 'mongoose';
class PerfEvalAnswers {
  /**
    @function createPerfEvalAns
    @param { object } payload
    Function adds Performance Evaluation Answers
  */
  public static async createPerfEvalAns(payload: any) {
    try {
      const result = await PerfEvalAnsService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /** 
    @function getPerfEvalAnsByEmpId
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns Performance Evaluation Answers by empId, year and quarter
  */
  public static async getPerfEvalAnsByEmpId(empId: any, year: any, quarter: any) {
    try {
      return await PerfEvalAnsModel.find({
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
    @function getSavedProjects
    @param { object } empId
    @param { object } year
    @param { object } quarter
    Function returns saved project names by empId, year and quarter
  */
  public static async getSavedProjects(empId: any, year: any, quarter: any) {
    try {
      const projects = await PerfEvalAnsModel.find({
        empId: empId,
        year: year,
        quarter: quarter,
        isDeleted: false
      });
      const names = projects.map((data: any, id: any) => {
        return data.projectName;
      });
      if (projects.length === 0 || names.length === 0) {
        throw new Error();
      }
      return names;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function getPerfEvalAnsByProject
    @param { object } empId
    @param { object } year
    @param { object } quarter
    @param { object } projectName
    Function returns Performance Evaluation Answers by empId, year,quarter and project name.
  */
  public static async getPerfEvalAnsByProject(
    empId: any,
    year: any,
    quarter: any,
    projectName: any
  ) {
    try {
      const answer: any = await PerfEvalAnsModel.findOne({
        empId: empId,
        year: year,
        quarter: quarter,
        projectName: projectName,
        isDeleted: false
      });
      const question: any = await SelfEvalQuesDal.getSelfEvalQues(year, quarter);
      return { questions: question.questions, answers: answer.answers };
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function updatePerfEvalAns
    @param { object } id
    @param { object } payload
    Function updates Performance Evaluation Answers
  */
  public static async updatePerfEvalAns(
    id: any,
    payload: MongooseUpdateQuery<Pick<Document, '_id'>>
  ) {
    try {
      const answers: any = await PerfEvalAnsModel.findByIdAndUpdate(id, payload).setOptions({
        new: true,
        overwrite: true
      });
      answers.updatedAt = new Date();
      return answers.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }

  /**
    @function deletePerfEvalAns
    @param { object } id
    Function deletes performance evaluation answers
  */
  public static async deletePerfEvalAns(id: any) {
    try {
      const payload: any = await PerfEvalAnsModel.findById({ _id: id });
      payload.isDeleted = true;
      payload.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default PerfEvalAnswers;
