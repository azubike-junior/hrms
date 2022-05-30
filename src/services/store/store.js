import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../modals/modals";
import setupAppraisalReducer from "./../PerformanceManagement/Configurations/appraisalSetup/setUpAppraisal";
import addOrganizationalGoalReducer from "./../PerformanceManagement/Configurations/organizationalGoal/addOrganizationalGoal";
import getOrganizationalGoalReducer from "./../PerformanceManagement/Configurations/organizationalGoal/getOrganizationalGoal";
import teamGoalReducer from "./../PerformanceManagement/Configurations/teamGoal/addTeamGoal";
import getTeamGoalsReducer from "../PerformanceManagement/Configurations/teamGoal/getTeamGoals";
import getCategoryTypesReducer from "./../PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import addCategoryTypeReducer from "./../PerformanceManagement/Configurations/categoryType/addCategoryType";
import getIndividualKpisReducer from "./../PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import addIndividualKpiReducer from "./../PerformanceManagement/Configurations/individualKpi/addIndividualKpi";
import getOrganizationalGoalsByCategoryReducer from "./../PerformanceManagement/Configurations/organizationalGoal/getOrganizationGoalByCategory";
import getTeamGoalsByOrganizationIdReducer from "./../PerformanceManagement/Configurations/teamGoal/getTeamGoalsByOrganizationalId";
import getKpiByCategoryIdReducer from "./../PerformanceManagement/StaffAppraisal/getKpiByCategoryId";
import getAppraisalsByStaffIdReducer from "./../PerformanceManagement/StaffAppraisal/getAppraisalsByStaffId";
import getAppraisalsBySupervisorIdReducer from "./../PerformanceManagement/StaffAppraisal/getAppraisalsBySupervisorId";
import getAppraisalByReferenceReducer from "../PerformanceManagement/StaffAppraisal/getAppraisalByReference";
import getTechnicalTrainingReducer from "./../PerformanceManagement/StaffAppraisal/getTechnicalTraining";
import getBehaviouralTrainingReducer from "./../PerformanceManagement/StaffAppraisal/getBehaviouralTraining";
import getStrengthsReducer from "./../PerformanceManagement/StaffAppraisal/getStrengths";
import updateAppraisalByReferenceReducer from "./../PerformanceManagement/StaffAppraisal/updateAppraisalByReference";
import getBehavioralMetricsReducer from "./../PerformanceManagement/Configurations/behavioralMetric/getBehavioralMetric";
import addBehavioralMetricReducer from "./../PerformanceManagement/Configurations/behavioralMetric/addBehavioralMetric";
import getRecommendationsReducer from "./../PerformanceManagement/Configurations/recommendation/getRecommendation";
import addRecommendationReducer from "./../PerformanceManagement/Configurations/recommendation/addRecommendation";
import loginReducer from "../Authentication/login"
import getAllDepartmentsReducer from "./../PerformanceManagement/hrReports/getAllDepartments";
import getAllAppraisalPeriodsReducer from "./../PerformanceManagement/hrReports/getAppraisalPeriods";
import getAllAppraisalsReducer from "./../PerformanceManagement/hrReports/getAllAppraisals";
import submitStaffAppraisalReducer from "./../PerformanceManagement/StaffAppraisal/submitStaffAppraisal";
import getGradesReducer from "./../PerformanceManagement/hrReports/getGrades";
import getAppraisalsByDateReducer from "./../PerformanceManagement/hrReports/getAppraisalByDate";
import rejectAppraisalReducer from "./../PerformanceManagement/StaffAppraisal/rejectAppraisal";
import getAllStaffsReducer from "./../PerformanceManagement/Configurations/staffs/getAllStaffs";
import getJobFunctionsReducer from "./../PerformanceManagement/Configurations/getJobFunctions/index";
import getKpiByJobFunctionReducer from "./../PerformanceManagement/Configurations/individualKpi/getKpibyJobFunction";
import editPerspectiveReducer from "./../PerformanceManagement/Configurations/categoryType/editPerspective";

const performanceManagement = combineReducers({
  setupAppraisalReducer,
  addOrganizationalGoalReducer,
  getOrganizationalGoalReducer,
  teamGoalReducer,
  getTeamGoalsReducer,
  getCategoryTypesReducer,
  addCategoryTypeReducer,
  getIndividualKpisReducer,
  addIndividualKpiReducer,
  getOrganizationalGoalsByCategoryReducer,
  getTeamGoalsByOrganizationIdReducer,
  getKpiByCategoryIdReducer,
  getAppraisalsByStaffIdReducer,
  getAppraisalsBySupervisorIdReducer,
  getAppraisalByReferenceReducer,
  getBehaviouralTrainingReducer,
  getTechnicalTrainingReducer,
  getStrengthsReducer,
  updateAppraisalByReferenceReducer,
  getBehavioralMetricsReducer,
  addBehavioralMetricReducer,
  getRecommendationsReducer,
  addRecommendationReducer,
  getAllDepartmentsReducer,
  getAllAppraisalPeriodsReducer,
  getAllAppraisalsReducer,
  submitStaffAppraisalReducer,
  getGradesReducer,
  getAppraisalsByDateReducer,
  rejectAppraisalReducer,
  getJobFunctionsReducer,
  getKpiByJobFunctionReducer,
  editPerspectiveReducer,
});

const authenticationManager = combineReducers({
  loginReducer,
});

export const store = configureStore({
  reducer: {
    modalReducer,
    performanceManagement,
    authenticationManager,
    getAllStaffsReducer,
  },
  middleware: (gdm) =>
    gdm({
      serializableCheck: false,
    }),
  devTools: true,
});

setupListeners(store.dispatch);
