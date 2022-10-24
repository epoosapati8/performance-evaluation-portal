import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  LOGIN,
  SELFDASH,
  MAINDASH,
  RMDASH,
  NODATAFOUND,
  SELFEVALFORMS,
  RMFORM,
  PROFILE,
  SETTINGS,
  REPORT,
  ANALYTICS,
  POSTQUESTIONS,
} from "../globals/config/urlMappings";

import Login from "../containers/login/login";
import ProtectedRoute from "./protectedRoute";
import Maindash from "../containers/dashboard/dashboard";
import Selfdash from "../containers/performance-evaluation/performanceEvaluation";
import Rmdash from "../containers/reportee-management/reporteeManagement";
import EmptyPage from "../components/empty-page/emptyPage";
import SelfEvalForms from "../containers/assessment-intermediate/assessmentIntermediate";
import Loader from "../components/loader-page/loaderPage";
import ManagerForms from "../containers/management-intermediate/managementIntermediate";
import Profile from "../containers/profile/profile";
import Settings from "../containers/settings/settings";
import Report from "../containers/report/report";
import Analytics from "../containers/analytics/analytics";
import PostAssessmentQuestions from "../containers/post-assessment-questions/postAssessmentQuestions";
import PageNotFound from "../components/404-page/404Page";

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Login}></Route>
    <Route exact path={LOGIN} component={Login}></Route>
    <Route exact path={NODATAFOUND} component={EmptyPage}></Route>
    <ProtectedRoute
      exact
      path={PROFILE}
      allowedRoles={["employee", "hr", "reportingManager", "hrManager"]}
      component={Profile}
    />
    <ProtectedRoute
      exact
      path={REPORT}
      allowedRoles={["employee", "hr", "reportingManager", "hrManager"]}
      component={Report}
    />
    <ProtectedRoute
      exact
      path={ANALYTICS}
      allowedRoles={["hr", "reportingManager", "hrManager"]}
      component={Analytics}
    />

    <ProtectedRoute
      exact
      path={SETTINGS}
      allowedRoles={["employee", "hr", "reportingManager", "hrManager"]}
      component={Settings}
    />
    <ProtectedRoute
      exact
      path={SELFEVALFORMS}
      allowedRoles={["employee", "hr", "reportingManager", "hrManager"]}
      component={SelfEvalForms}
    />
    <ProtectedRoute
      exact
      path={RMFORM}
      allowedRoles={["hr", "reportingManager", "hrManager"]}
      component={ManagerForms}
    />
    <ProtectedRoute
      exact
      path={SELFDASH}
      allowedRoles={["employee", "hr", "reportingManager", "hrManager"]}
      component={Selfdash}
    />
    <ProtectedRoute
      exact
      path={MAINDASH}
      allowedRoles={["hr", "reportingManager", "hrManager"]}
      component={Maindash}
    />
    <ProtectedRoute
      exact
      path={RMDASH}
      allowedRoles={["hr", "reportingManager", "hrManager"]}
      component={Rmdash}
    />
    <ProtectedRoute
      exact
      path={POSTQUESTIONS}
      allowedRoles={["hrManager"]}
      component={PostAssessmentQuestions}
    />
    <Route exact path="/loader" component={Loader}></Route>
    <Route path="*" component={PageNotFound}></Route>
  </Switch>
);

export default MainRouter;
