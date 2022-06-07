/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import "../../assets/css/antdstyle.css";
import {
  createStore,
  useStateMachine,
  StateMachineProvider,
  GlobalState,
} from "little-state-machine";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAppraisalByReferenceId } from "../../services/PerformanceManagement/StaffAppraisal/getAppraisalByReference";
import { addSelect, updateName } from "../../utils/helper";
import Modal from "react-bootstrap/Modal";
import {
  NewSupervisorKpiInputComponent,
  NewSupervisorKpiReviewComponent,
} from "../../components/KpiComponent";
import { updateAppraisalByReference } from "../../services/PerformanceManagement/StaffAppraisal/updateAppraisalByReference";
import Loader from "./../../components/Loader/index";

const SupervisorAppraisalReview2 = () => {
  const dispatch = useDispatch();
  const { state: allData, actions } = useStateMachine({ updateName });
  const [kpiResult, setKpiResult] = useState("");
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  const { departmentName, secondLevelSupervisorStaffId, unitName } = staffData;

  const clearKPIs = () => {
    allData.data = {
      KPIs: [],
    };
    actions.update(allData.data);
  };

  const {
    recommendation,
    supervisorBehaviouralTrainings,
    supervisorFunctionalTrainings,
    behaviouralTrainingsArray,
    functionalTrainingsArray,
    supervisorComment,
    secondSupervisorComment,
    strengthScore,
    secondLevelSupervisorComment,
    supervisorTimeManagementScore,
    supervisorPunctualityScore,
    supervisorProfessionalConductScore,
    supervisorCommunicationScore,
    supervisorAnalyticalThinkingScore,
    appraiseeStrengthScore,
  } = allData?.data;

  const { appraisalReference } = useParams();

  const { data: details } = useSelector(
    (state) => state.performanceManagement.getAppraisalByReferenceReducer
  );

  const { loading: updateAppraiseLoading } = useSelector(
    (state) => state.performanceManagement.updateAppraisalByReferenceReducer
  );

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  const submitAppraisal = () => {
    const appraise = details?.kpis.map((kpi) => {
      return {
        supervisorRate: allData.data.supervisorRates[kpi.kpiId],
        key: kpi.key,
        supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
        kpiId: Number(kpi.kpiId),
        categoryId: Number(kpi.categoryId),
        appraiseeResult: kpi.appraiseeResult,
        appraiseeRate: kpi.appraiseeRate,
      };
    });

    const appraisals = {
      appraisalReference,
      recommendation,
      supervisorBehaviouralTrainings,
      supervisorFunctionalTrainings,
      supervisorComment,
      secondLevelSupervisorComment: "",
      totalSupervisorResult: kpiResult,
      secondLevelSupervisorComment,
      supervisorTimeManagementScore,
      supervisorPunctualityScore,
      supervisorProfessionalConductScore,
      supervisorCommunicationScore,
      supervisorAnalyticalThinkingScore,
      kpis: appraise,
    };

    const data = {
      appraisals,
      history,
      clearKPIs,
    };
    console.log(">>>>>>appraisals", appraisals);
    dispatch(updateAppraisalByReference(data));
  };

  const resultValues = Object.values(allData.data.supervisorResults);

  const result = resultValues
    .reduce((acc, num) => {
      return Number(acc) + Number(num);
    }, 0)
    .toFixed(1);

  useEffect(() => {
    setKpiResult(result);
  });

  useEffect(() => {
    dispatch(getAppraisalByReferenceId(appraisalReference));
  }, []);

  const {
    appraisalPeriodStatus,
    appraiseeName,
    supervisorId,
    supervisorName,
    dateSubmitted,
    staffId,
    lastPromotionDate,
    totalAppraiseeResult,
    appraiseeTimeManagementScore,
    appraiseePunctualityScore,
    appraiseeProfessionalConductScore,
    appraiseeCommunicationScore,
    appraiseeAnalyticalThinkingScore,
    appraiseeBehaviouralTrainings,
    appraiseeFunctionalTrainings,
    secondSupervisorName,
    secondLevelSupervisorId,
    gradeName,
    kpis,
  } = details;

  const allProcess = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Process")
    .map((kpi, index) => {
      if (index === 0) {
        return {
          ...kpi,
          categoryDescription: kpi.categoryDescription,
          supervisorRate: allData.data.supervisorRates[kpi.kpiId],
          supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
        };
      }
      return {
        ...kpi,
        categoryDescription: "",
        supervisorRate: allData.data.supervisorRates[kpi.kpiId],
        supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
      };
    });

  const allCustomer = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Customer")
    .map((kpi, index) => {
      if (index === 0) {
        return {
          ...kpi,
          categoryDescription: kpi.categoryDescription,
          supervisorRate: allData.data.supervisorRates[kpi.kpiId],
          supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
        };
      }
      return {
        ...kpi,
        categoryDescription: "",
        supervisorRate: allData.data.supervisorRates[kpi.kpiId],
        supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
      };
    });

  const allFinancial = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Financial")
    .map((kpi, index) => {
      if (index === 0) {
        return {
          ...kpi,
          categoryDescription: kpi.categoryDescription,
          supervisorRate: allData.data.supervisorRates[kpi.kpiId],
          supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
        };
      }
      return {
        ...kpi,
        categoryDescription: "",
        supervisorRate: allData.data.supervisorRates[kpi.kpiId],
        supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
      };
    });

  const allCapacityDevelopment = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Capacity Development")
    .map((kpi, index) => {
      if (index === 0) {
        return {
          ...kpi,
          categoryDescription: kpi.categoryDescription,
          supervisorRate: allData.data.supervisorRates[kpi.kpiId],
          supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
        };
      }
      return {
        ...kpi,
        categoryDescription: "",
        supervisorRate: allData.data.supervisorRates[kpi.kpiId],
        supervisorResult: allData.data.supervisorResults[kpi.kpiId].toFixed(),
      };
    });

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Appraisal Review</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="m-t-50 container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Appraisal Review</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={`/staffAppraisalDetail/${appraisalReference}`}>
                    Back to Appraisal Page
                  </Link>
                </li>
                <li className="breadcrumb-item active">Review</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50">
          {/* <div className="card-body"> */}
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                {/* Table Header  Starts Here */}

                <div className="card m-b-50">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="profile-view">
                          <label
                            className="font-18 font-weight-bold m-b-20"
                            style={{ textDecoration: "underline" }}
                          >
                            STAFF DETAILS
                          </label>

                          {/* Staff Details Starts Here */}
                          <div className="d-flex mb-5">
                            <div className="col-lg-6">
                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  SUPERVISOR ID:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {supervisorId}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  SUPERVISOR NAME:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {supervisorName}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  APPRAISEE NAME:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {appraiseeName}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  DATE SUBMITTED:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {dateSubmitted}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  STAF ID
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {staffId}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  DEPARTMENT:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {departmentName}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  LAST PROMOTION DATE:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {lastPromotionDate === "0001-01-01"
                                    ? "N/A"
                                    : lastPromotionDate}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  GRADE:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {gradeName}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  UNIT:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {unitName}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  APPRAISAL PERIOD STATUS:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {appraisalPeriodStatus}
                                </div>
                              </div>

                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  SECOND SUPERVISOR ID:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {secondLevelSupervisorId}
                                </div>
                              </div>
                              <div className="d-flex m-b-10 font_size">
                                <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                  SECOND SUPERVISOR NAME:
                                </div>
                                <div className="col-lg-7 col-md-6 col-sm-12">
                                  {secondSupervisorName}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Staff Details Ends Here */}

                          <div
                            className="row d-flex border-bottom pt-2 pb-2 font-weight-bolder"
                            style={{
                              backgroundColor: "#cccccc",
                              marginBottom: "10px",
                            }}
                          >
                            <div className="col-lg-12">
                              <div
                                className="user-name"
                                style={{ fontWeight: "bolder" }}
                              >
                                SCORECARD
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            {/* Table Header  Starts Here */}
                            <div
                              className="col-lg-12 d-flex border-bottom pt-2 pb-2 font-weight-bolder"
                              style={{ backgroundColor: "#efefef" }}
                            >
                              <div className="col-lg-2">PERSPECTIVE</div>
                              <div className="col-lg-3">KPI</div>
                              <div className="col-lg-1 text-center">TARGET</div>
                              <div className="col-lg-1 text-center">WEIGHT</div>
                              <div className="col-lg-1 text-center">
                                APP. RATING
                              </div>
                              <div className="col-lg-2 text-center">
                                APP. SCORE
                              </div>
                              <div className="col-lg-1 text-center">
                                SUP. SCORE
                              </div>
                              <div className="col-lg-1 text-center">
                                FINAL RATING
                              </div>
                            </div>
                            {/* Table Header Ends Here */}

                            {/* Financial Review Starts Here */}
                            {allFinancial?.map((kpi) => {
                              return (
                                <NewSupervisorKpiReviewComponent kpi={kpi} />
                              );
                            })}

                            {/* Customer Review Starts Here */}
                            {allCustomer?.map((kpi) => {
                              return (
                                <NewSupervisorKpiReviewComponent kpi={kpi} />
                              );
                            })}

                            {/* Process Review Starts Here */}
                            {allProcess?.map((kpi) => {
                              return (
                                <NewSupervisorKpiReviewComponent kpi={kpi} />
                              );
                            })}

                            {/* Process Review Ends Here */}

                            {/* Customer Review Ends Here */}

                            {allCapacityDevelopment?.map((kpi) => {
                              return (
                                <NewSupervisorKpiReviewComponent kpi={kpi} />
                              );
                            })}

                            {/* Financial Review Ends Here */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-12 d-flex border-bottom pt-3 pb-3"
                      style={{
                        fontWeight: "bolder",
                        backgroundColor: "#efefef",
                      }}
                    >
                      <div className="col-lg-2">TOTAL</div>
                      <div className="col-lg-3"></div>
                      <div className="col-lg-1 text-center"></div>
                      <div className="col-lg-1 text-center"></div>
                      <div className="col-lg-1 text-center"></div>
                      <div
                        className="col-lg-2 text-center total-style"
                        style={{
                          color: "#DAA520",
                          fontSize: "18px",
                          fontWeight: "bolder",
                        }}
                      >
                        {totalAppraiseeResult?.toFixed()}
                      </div>
                      <div className="col-lg-1 text-center"></div>
                      <div
                        className="col-lg-1 text-center total-style"
                        style={{
                          color: "#DAA520",
                          fontSize: "18px",
                          fontWeight: "bolder",
                        }}
                      >
                        {Number(kpiResult)?.toFixed()}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-12 border-bottom pt-2 pb-2 font-weight-bolder"
                  style={{
                    fontWeight: "bolder",
                    marginBottom: "10px",
                    backgroundColor: "#cccccc",
                  }}
                >
                  <div className="col-lg-12  user-name">STRENGTHS</div>
                </div>

                <div className="d-flex m-b-50 ">
                  <div className="card col-lg-8">
                    <div className="card-body">
                      {/* <div className="row"> */}
                      <div className="profile-view">
                        {/* Staff Details Starts Here */}
                        <div className="d-flex mb-2 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <h4 className="col-lg-4">Skills</h4>
                            <h4 className="col-lg-4">Rating</h4>
                            <h4 className="col-lg-4">Appraisee Rating</h4>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}

                      <div className="d-flex mt-3 mb-3 border-bottom">
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-4">Time Management</div>

                          <div className="col-lg-4">
                            <div id="ratings_group">
                              {supervisorTimeManagementScore}/5
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {appraiseeTimeManagementScore}/5
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-3 mb-3 border-bottom">
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-4">Punctuality</div>

                          <div className="col-lg-4">
                            <div id="ratings_group">
                              {supervisorPunctualityScore}/5
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {appraiseePunctualityScore}/5
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-3 mb-3 border-bottom">
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-4">Professional Conduct</div>

                          <div className="col-lg-4">
                            <div id="ratings_group">
                              {supervisorProfessionalConductScore}/5
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {appraiseeProfessionalConductScore}/5
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-3 mb-3 border-bottom">
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-4">Communication</div>

                          <div className="col-lg-4">
                            <div id="ratings_group">
                              {supervisorCommunicationScore}/5
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {appraiseeCommunicationScore}/5
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-3 mb-3 border-bottom">
                        <div className="col-lg-12 d-flex">
                          <div className="col-lg-4">Analytic Thinking</div>

                          <div className="col-lg-4">
                            <div id="ratings_group">
                              {supervisorAnalyticalThinkingScore}/5
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {appraiseeAnalyticalThinkingScore}/5
                          </div>
                        </div>
                      </div>

                      <div className="d-flex border-bottom">
                        <div
                          className="col-lg-12 pt-3 pb-3 d-flex"
                          style={{
                            fontWeight: "bolder",
                            backgroundColor: "#efefef",
                          }}
                        >
                          <div className="col-lg-4">TOTAL</div>
                          <div className="col-lg-4">{strengthScore}/25</div>
                          <div className="col-lg-4">
                            {appraiseeStrengthScore}/25
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card col-lg-4">
                    <div className="card-body">
                      <div className="profile-view">
                        <div className="d-flex mb-5">
                          <div className="col-lg-12">
                            <h4 className="card-title">Ratings Key</h4>
                            <div>
                              <p>
                                <i className="fa fa-dot-circle-o text-purple mr-2" />
                                Excellent
                                <span className="float-right">5</span>
                              </p>
                              <p>
                                <i className="fa fa-dot-circle-o text-success mr-2" />
                                Very Good <span className="float-right">4</span>
                              </p>
                              <p>
                                <i className="fa fa-dot-circle-o text-info mr-2" />
                                Average<span className="float-right">3</span>
                              </p>
                              <p>
                                <i className="fa fa-dot-circle-o text-warning mr-2" />
                                Fair<span className="float-right">2</span>
                              </p>
                              <p>
                                <i className="fa fa-dot-circle-o text-danger mr-2" />
                                Poor<span className="float-right">1</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-12 border-bottom pt-2 pb-2 font-weight-bolder"
                  style={{
                    fontWeight: "bolder",
                    marginBottom: "10px",
                    backgroundColor: "#cccccc",
                  }}
                >
                  <div className="col-lg-12  user-name">TRAINING</div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="profile-view d-flex">
                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading text-center font-weight-bold">
                            BEHAVIOURAL TRAINING
                          </div>
                          {behaviouralTrainingsArray.length === 0 ? (
                            <p>No behavioral training was selected</p>
                          ) : (
                            <div className="panel-body">
                              <div className="m-3">
                                <div className="form-group">
                                  <label>Suggest a Behavioural Training:</label>
                                  {behaviouralTrainingsArray?.map(
                                    (training) => {
                                      return (
                                        <ul>
                                          <li>{training}</li>
                                        </ul>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="mt-3">
                            <div className="m-3">
                              <div className="form-group">
                                <label>
                                  Suggested Behavioural Training By Appraisee:
                                </label>
                                {appraiseeBehaviouralTrainings}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="panel panel-default">
                          <div className="panel-heading text-center font-weight-bold">
                            FUNCTIONAL TRAINING
                          </div>
                          {functionalTrainingsArray.length === 0 ? (
                            <p>No functional training selected</p>
                          ) : (
                            <div className="panel-body">
                              <div className="m-3">
                                <div className="form-group">
                                  <label>Suggest a Functional Training:</label>
                                  {functionalTrainingsArray?.map((training) => {
                                    return (
                                      <ul>
                                        <li>{training}</li>
                                      </ul>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="mt-3">
                            <div className="m-3">
                              <div className="form-group">
                                <label>
                                  Suggested Functional Training By Appraisee:
                                </label>
                                {appraiseeFunctionalTrainings}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-lg-12"
                      style={{ marginTop: "30px", marginBottom: "20px" }}
                    >
                      {/* <div
                          className="font-weight-bolder"
                          style={{
                            marginBottom: "30px",
                            textDecoration: "underline",
                          }}
                        >
                          COMMENTS
                        </div> */}

                      <div className="form-group mb-5">
                        <div
                          className="mb-3 font-weight-bold"
                          style={{
                            marginBottom: "30px",
                            textDecoration: "underline",
                          }}
                        >
                          SUPERVISOR'S COMMENT
                        </div>
                        {supervisorComment}
                      </div>

                      {/* <div className="form-group">
                          <div
                            className="mb-3 font-weight-bold"
                            style={{
                              marginBottom: "20px",
                              textDecoration: "underline",
                            }}
                          >
                            STAFF'S COMMENT
                          </div>
                          <div className="mb-3">
                            Own yo' ipsizzle pimpin' sizzle amizzle,
                            consectetizzle bizzle elit. Nullam dawg velit,
                            mammasay mammasa mamma oo sa volutpat, ma nizzle mah
                            nizzle, gravida vel, arcu. Pellentesque shizznit
                            tortizzle. Shiz erizzle. Fusce izzle shit dapibizzle
                            turpis tempizzle dope. Maurizzle pellentesque nibh
                            et sizzle. Things fo shizzle my nizzle tortor.
                            Sheezy izzle rhoncizzle nisi. In hac habitasse
                            platea dictumst. Uhuh ... yih! dapibizzle.
                          </div>
                        </div> */}
                    </div>

                    <div className="col-lg-4" style={{ marginTop: "50px" }}>
                      <div
                        className="font-weight-bolder"
                        style={{
                          marginBottom: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        RECOMMENDATION
                      </div>

                      <div className="form-group ">{recommendation}</div>
                    </div>
                  </div>
                </div>
                {/* Supervisor's Comments Ends Here */}
              </div>

              {/* Submit Appraisal Button */}
              <div
                className="form-group col-lg-12 col-md-12 col-sm-12"
                style={{ marginTop: "50px" }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                    <button
                      className="btn btn-block btn-suntrust font-weight-700"
                      onClick={() => toggleModal()}
                    >
                      {updateAppraiseLoading ? <Loader /> : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Content */}
          </div>
          {/* </div> */}
        </div>
      </div>

      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Supervisor Rating</h3>
                <p>Are you sure you want to proceed</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-6">
                    <button
                      className="btn btn-block btn-primary"
                      onClick={() => {
                        submitAppraisal();
                        toggleModal();
                      }}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => toggleModal()}
                      className="btn btn-block btn-outline-danger"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SupervisorAppraisalReview2;
