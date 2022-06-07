import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../modals/modals";
import setupAppraisalReducer from "./../services/PerformanceManagement/Configurations/appraisalSetup/setUpAppraisal";
import addOrganizationalGoalReducer from "./../services/PerformanceManagement/Configurations/organizationalGoal/addOrganizationalGoal";
import getOrganizationalGoalReducer from "./../services/PerformanceManagement/Configurations/organizationalGoal/getOrganizationalGoal";
import teamGoalReducer from "./../services/PerformanceManagement/Configurations/teamGoal/addTeamGoal";
import getTeamGoalsReducer from "../services/PerformanceManagement/Configurations/teamGoal/getTeamGoals";
import getCategoryTypesReducer from "./../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import addCategoryTypeReducer from "./../services/PerformanceManagement/Configurations/categoryType/addCategoryType";
import getIndividualKpisReducer from "./../services/PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import addIndividualKpiReducer from "./../services/PerformanceManagement/Configurations/individualKpi/addIndividualKpi";
import getOrganizationalGoalsByCategoryReducer from "./../services/PerformanceManagement/Configurations/organizationalGoal/getOrganizationGoalByCategory";
import getTeamGoalsByOrganizationIdReducer from "./../services/PerformanceManagement/Configurations/teamGoal/getTeamGoalsByOrganizationalId";
import getKpiByCategoryIdReducer from "./../services/PerformanceManagement/StaffAppraisal/getKpiByCategoryId";
import getAppraisalsByStaffIdReducer from "./../services/PerformanceManagement/StaffAppraisal/getAppraisalsByStaffId";
import getAppraisalsBySupervisorIdReducer from "./../services/PerformanceManagement/StaffAppraisal/getAppraisalsBySupervisorId";
import getAppraisalByReferenceReducer from "../services/PerformanceManagement/StaffAppraisal/getAppraisalByReference";
import getTechnicalTrainingReducer from "./../services/PerformanceManagement/StaffAppraisal/getTechnicalTraining";
import getBehaviouralTrainingReducer from "./../services/PerformanceManagement/StaffAppraisal/getBehaviouralTraining";
import getStrengthsReducer from "./../services/PerformanceManagement/StaffAppraisal/getStrengths";
import updateAppraisalByReferenceReducer from "./../services/PerformanceManagement/StaffAppraisal/updateAppraisalByReference";
import getBehavioralMetricsReducer from "./../services/PerformanceManagement/Configurations/behavioralMetric/getBehavioralMetric";
import addBehavioralMetricReducer from "./../services/PerformanceManagement/Configurations/behavioralMetric/addBehavioralMetric";
import getRecommendationsReducer from "./../services/PerformanceManagement/Configurations/recommendation/getRecommendation";
import addRecommendationReducer from "./../services/PerformanceManagement/Configurations/recommendation/addRecommendation";
import loginReducer from "./../services/Authentication/login";
import getAllDepartmentsReducer from "./../services/PerformanceManagement/hrReports/getAllDepartments";
import getAllAppraisalPeriodsReducer from "./../services/PerformanceManagement/hrReports/getAppraisalPeriods";
import getAllAppraisalsReducer from "./../services/PerformanceManagement/hrReports/getAllAppraisals";
import submitStaffAppraisalReducer from "./../services/PerformanceManagement/StaffAppraisal/submitStaffAppraisal";
import getGradesReducer from "./../services/PerformanceManagement/hrReports/getGrades";
import getAppraisalsByDateReducer from "./../services/PerformanceManagement/hrReports/getAppraisalByDate";
import rejectAppraisalReducer from "./../services/PerformanceManagement/StaffAppraisal/rejectAppraisal";
import getAllStaffsReducer from "./../services/PerformanceManagement/Configurations/staffs/getAllStaffs";
import getJobFunctionsReducer from "./../services/PerformanceManagement/Configurations/getJobFunctions/index";
import getKpiByJobFunctionReducer from "./../services/PerformanceManagement/Configurations/individualKpi/getKpibyJobFunction";
import editPerspectiveReducer from "./../services/PerformanceManagement/Configurations/categoryType/editPerspective";
import { getPerformanceConfigQuery } from "../services/PerformanceManagement/Configurations/getPerformanceConfigs";
import getTargetSourceReducer from "./../services/PerformanceManagement/Configurations/getTargetSources";
import getRateTypeMetricReducer from "./../services/PerformanceManagement/Configurations/getRateTypeMetric";
import getKpiByJobReducer from './../services/PerformanceManagement/Configurations/individualKpi/getKpiByJobFunc';

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
  getTargetSourceReducer,
  getRateTypeMetricReducer,
  getKpiByJobReducer,
});

const authenticationManager = combineReducers({
  loginReducer,
});

export const store = configureStore({
  reducer: {
    [getPerformanceConfigQuery.reducerPath]: getPerformanceConfigQuery.reducer,
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
