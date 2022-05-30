/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// import SetupAppraisal from "./Configurations/setupAppraisal";
// import DepartmentGoal from "./Configurations/departmentGoal/index";
// import IndividualKPI from "./Configurations/IndividualKpi";
// import OrganizationalGoal from "./Configurations/organizationalGoal/index";
// import TeamGoal from "./Configurations/teamGoal";
// import UnitKPI from "./Configurations/unitKpi";
// import StaffAppraisalReview from "./NewAppraisalReview";
// import StaffsAppraisals from "./MyStaffsAppraisals";
// import StaffAppraisal from "./NewAppraisal";
// import SupervisorAppraisalReview2 from "./SupervisorReview2/index";
import Appraisals from "../../pages/Appraisals";
// import AppraiseeUpdatedReview from "./AppraiseeUpdatedReview/index";
// import PreProcessAppraisal from "./PreProcessAppraisal/index";
// import Trainings from "./Configurations/Trainings";
// import StaffAppraisalDetail from "./StaffAppraisalDetails/index";
// import PastRecords from "./HrReports/PastRecords/index";
// import CurrentReports from "./HrReports/CurrentReports";
// import ViewAppraisalByHr from "./HrReports/ViewAppraisalByHr/index";
// import UpdateAppraisalFromStage4 from "./MyStaffsAppraisals/UpdateAppraisalFromStage4/index";
// import SetupProfile from "./SetupProfile";
// import Perspective from "./Configurations/perspectives/index";

const PerformanceManagementRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`/performanceManagement`} />
    {/* <Route
      exact
      path={`${match.url}/config/setupAppraisal`}
      component={SetupAppraisal}
    />
    <Route exact path={`${match.url}/config/Trainings`} component={Trainings} />
    <Route
      exact
      path={`${match.url}/config/perspective`}
      component={Perspective}
    />
    <Route
      exact
      path={`${match.url}/config/departmentGoal`}
      component={DepartmentGoal}
    />
    <Route exact path={`${match.url}/config/teamGoal`} component={TeamGoal} />
    <Route
      exact
      path={`${match.url}/config/individualKpi`}
      component={IndividualKPI}
    />
    <Route
      exact
      path={`${match.url}/config/departmentGoal`}
      component={DepartmentGoal}
    />
    <Route
      exact
      path={`${match.url}/config/organizationalGoal`}
      component={OrganizationalGoal}
    />
    <Route exact path={`${match.url}/config/unitKpi`} component={UnitKPI} /> */}
    <Route exact path={`${match.url}/Appraisals`} component={Appraisals} />
    {/* <Route
      exact
      path={`${match.url}/HrReports/pastRecords`}
      component={PastRecords}
    />
    <Route
      exact
      path={`${match.url}/HrReports/currentReports`}
      component={CurrentReports}
    />
    <Route
      exact
      path={`${match.url}/staffAppraisalReview`}
      component={StaffAppraisalReview}
    />
    <Route
      exact
      path={`${match.url}/supervisorAppraisalReview2/:appraisalReference`}
      component={SupervisorAppraisalReview2}
    />
    <Route
      exact
      path={`${match.url}/preprocessAppraisal/:appraisalReference`}
      component={PreProcessAppraisal}
    />
    <Route
      exact
      path={`${match.url}/viewAppraisalByHr/:appraisalReference`}
      component={ViewAppraisalByHr}
    />
    <Route
      exact
      path={`${match.url}/EditAppraisalBySupervisor/:appraisalReference`}
      component={UpdateAppraisalFromStage4}
    />
    <Route exact path={`${match.url}/setupProfile`} component={SetupProfile} />
    <Route
      exact
      path={`${match.url}/staffAppraisalDetail/:appraisalReference`}
      component={StaffAppraisalDetail}
    />
    <Route
      exact
      path={`${match.url}/appraiseeUpdatedReview/:appraisalReference`}
      component={AppraiseeUpdatedReview}
    />
    <Route
      exact
      path={`${match.url}/staffAppraisal`}
      component={StaffAppraisal}
    />
    <Route
      exact
      path={`${match.url}/allStaffAppraisals`}
      component={StaffsAppraisals}
    /> */}
  </Switch>
);

export default PerformanceManagementRoute;
