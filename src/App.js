import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  Switch,
} from "react-router-dom";
// import SidebarContent from "./components/Sidebar";
import Header from "./components/Header";
import Loginpage from "./pages/Login";

import "font-awesome/css/font-awesome.min.css";

import "./assets/css/font-awesome.min.css";
import "./assets/css/line-awesome.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/sidebar.css";

// Custom Style File
// import "./assets/js/bootstrap.min.js";
// import "./assets/css/select2.min.css";

// import "./assets/js/popper.min.js";
// import "./assets/js/select2.min.js";
// import "./assets/js/jquery-3.2.1.min.js";
import "./assets/css/main.css";

// import "./assets/js/jquery.slimscroll.min.js";

// import "./assets/js/bootstrap-datetimepicker.min.js";
// import "./assets/js/jquery-ui.min.js";
import "./assets/js/task.js";
// import "./assets/js/multiselect.min.js";
import "./assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
// import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/style.css";
import "./assets/css/demo.css";

import Appraisals from "./pages/Appraisals";
import SetupProfile from "./pages/SetupProfile";
import StaffAppraisal from "./pages/NewAppraisal";
import StaffsAppraisals from "./pages/MyStaffsAppraisals";
import StaffAppraisalReview from "./pages/NewAppraisalReview";
import SupervisorAppraisalReview2 from "./pages/SupervisorReview2/index";
import PreProcessAppraisal from "./pages/PreProcessAppraisal/index";
import ViewAppraisalByHr from "./pages/HrReports/ViewAppraisalByHr/index";
import UpdateAppraisalFromStage4 from "./pages/MyStaffsAppraisals/UpdateAppraisalFromStage4/index";
import StaffAppraisalDetail from "./pages/StaffAppraisalDetails/index";
import AppraiseeUpdatedReview from "./pages/AppraiseeUpdatedReview/index";
import SidebarContent from "./components/SidebarContent.js";
import SetupAppraisal from "./pages/Configurations/setupAppraisal";
import Trainings from "./pages/Configurations/Trainings/index";
import Perspective from "./pages/Configurations/perspectives/index";
import DepartmentGoal from "./pages/Configurations/departmentGoal/index";
import TeamGoal from "./pages/Configurations/teamGoal/index";
import IndividualKPI from "./pages/Configurations/IndividualKpi/index";
import OrganizationalGoal from "./pages/Configurations/organizationalGoal/index";
import PastRecords from "./pages/HrReports/PastRecords/index";
import CurrentReports from "./pages/HrReports/CurrentReports/index";
import PrivateRoute from './components/Router/PrivateRoute';
import {createBrowserHistory}  from "history"

const browserHistory = createBrowserHistory({
  basename: "/hrms"
})

function App() {
  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/hrms" component={Loginpage} />
        <div>
          <Header />
          <div>
            <PrivateRoute exact path="/hrms/Appraisals" component={Appraisals} />
            <PrivateRoute exact path="/hrms/setupProfile" component={SetupProfile} />
            <PrivateRoute
              exact
              path="/hrms/staffAppraisal"
              component={StaffAppraisal}
            />
            <PrivateRoute
              exact
              path="/hrms/staffAppraisals"
              component={StaffsAppraisals}
            />

            <PrivateRoute
              exact
              path="/hrms/config/setupAppraisal"
              component={SetupAppraisal}
            />
            <PrivateRoute exact path="/hrms/config/Trainings" component={Trainings} />
            <PrivateRoute exact path="/hrms/config/perspective" component={Perspective} />

            <PrivateRoute exact path="/hrms/config/teamGoal" component={TeamGoal} />
            <PrivateRoute
              exact
              path="/hrms/config/individualKpi"
              component={IndividualKPI}
            />

            <PrivateRoute
              exact
              path="/hrms/config/organizationalGoal"
              component={OrganizationalGoal}
            />

            <PrivateRoute
              exact
              path="/hrms/HrReports/pastRecords`"
              component={PastRecords}
            />
            <PrivateRoute
              exact
              path="/hrms/HrReports/currentReports"
              component={CurrentReports}
            />
            <PrivateRoute
              exact
              path="/hrms/staffAppraisalReview"
              component={StaffAppraisalReview}
            />
            <PrivateRoute
              exact
              path="/hrms/supervisorAppraisalReview/:appraisalReference"
              component={SupervisorAppraisalReview2}
            />
            <PrivateRoute
              exact
              path="/hrms/preprocessAppraisal/:appraisalReference"
              component={PreProcessAppraisal}
            />
            <PrivateRoute
              exact
              path="/hrms/viewAppraisalByHr/:appraisalReference"
              component={ViewAppraisalByHr}
            />
            <PrivateRoute
              exact
              path="/hrms/EditAppraisalBySupervisor/:appraisalReference"
              component={UpdateAppraisalFromStage4}
            />
            <PrivateRoute
              exact
              path="/hrms/staffAppraisalDetail/:appraisalReference"
              component={StaffAppraisalDetail}
            />
            <PrivateRoute
              exact
              path="/hrms/appraiseeUpdatedReview/:appraisalReference"
              component={AppraiseeUpdatedReview}
            />
          </div>
          <SidebarContent />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
