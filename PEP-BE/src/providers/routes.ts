import Locals from './locals';
import { Application } from 'express';
import users from '../collections/routes/users-router';
import employees from '../collections/routes/employees-router';
import perfEvalAnswers from '../collections/routes/perf-eval-ans-router';
import scoreSheetAnswers from '../collections/routes/score-sheet-ans-router';
import scoreSheetQues from '../collections/routes/score-sheet-ques-router';
import selfEvalQues from '../collections/routes/self-eval-ques-router';
import projects from '../collections/routes/projects-router';
import projectsEmp from '../collections/routes/projects-emp-router';
import reportABug from '../collections/routes/report-a-bug-router';
import designation from '../collections/routes/designations-router';
class Routes {
  public mountApi(_express: Application): Application {
    //   const apiPrefix = Locals.config().apiPrefix;
    const apiPrefix = 'api/v1';
    _express.use(`/api/v1/users`, users);
    _express.use(`/api/v1/employees`, employees);
    _express.use(`/api/v1/scoreSheetAnswers`, scoreSheetAnswers);
    _express.use(`/api/v1/perfEvalAnswers`, perfEvalAnswers);
    _express.use(`/api/v1/scoreSheetQues`, scoreSheetQues);
    _express.use(`/api/v1/selfEvalQues`, selfEvalQues);
    _express.use(`/api/v1/projects`, projects);
    _express.use(`/api/v1/projectsEmp`, projectsEmp);
    _express.use(`/api/v1/reportABug`, reportABug);
    _express.use(`/api/v1/designation`, designation);
    return _express;
  }
}
export default new Routes();
