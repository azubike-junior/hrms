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
import {
  NewSupervisorKpiInputComponent,
  NewSupervisorKpiReviewComponent,
} from "../../components/KpiComponent";
import { updateAppraisalByReference } from "../../services/PerformanceManagement/StaffAppraisal/updateAppraisalByReference";
import Modal from "react-bootstrap/Modal";
import { updateCommentSection } from "../../services/PerformanceManagement/StaffAppraisal/updateCommentSection";
import Loader from "./../../components/Loader/index";

const AppraiseeUpdatedReview = () => {
  const dispatch = useDispatch();
  const { appraisalReference } = useParams();
  const [comment, setComment] = useState("");
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  const { departmentName, secondLevelSupervisorId, secondLevelSupervisorName, unitName } =
    staffData;

  const { data: details } = useSelector(
    (state) => state.performanceManagement.getAppraisalByReferenceReducer
  );

  const {
    appraisalPeriodStatus,
    appraiseeName,
    supervisorId,
    supervisorName,
    secondSupervisorName,
    exceptionalAchievement,
    dateSubmitted,
    staffId,
    lastPromotionDate,
    totalAppraiseeResult,
    totalSupervisorResult,
    supervisorComment,
    status,
    appraiseeComment,
    supervisorTimeManagementScore,
    supervisorPunctualityScore,
    supervisorProfessionalConductScore,
    supervisorCommunicationScore,
    supervisorAnalyticalThinkingScore,
    appraiseeTimeManagementScore,
    appraiseePunctualityScore,
    appraiseeProfessionalConductScore,
    appraiseeCommunicationScore,
    appraiseeAnalyticalThinkingScore,
    appraiseeBehaviouralTrainings,
    appraiseeFunctionalTrainings,
    supervisorFunctionalTrainings,
    supervisorBehaviouralTrainings,
    reasonForRejection,
    rejectionStage,
    gradeName,
    kpis,
  } = details;

  console.log(
    ">>>>>>>>appraisalFunctional",
    // supervisorFunctionalTrainings,
    supervisorBehaviouralTrainings
  );

  const supervisorStrengthScore =
    Number(supervisorTimeManagementScore) +
    Number(supervisorProfessionalConductScore) +
    Number(supervisorAnalyticalThinkingScore) +
    Number(supervisorPunctualityScore) +
    Number(supervisorCommunicationScore);

  const appraiseeStrengthScore =
    Number(appraiseeTimeManagementScore) +
    Number(appraiseeProfessionalConductScore) +
    Number(appraiseeAnalyticalThinkingScore) +
    Number(appraiseePunctualityScore) +
    Number(appraiseeCommunicationScore);

  const allProcess = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Process")
    .map((kpi, index) => {
      if (index === 0) {
        return { ...kpi, categoryDescription: kpi.categoryDescription };
      }
      return { ...kpi, categoryDescription: "" };
    });

  const allCustomer = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Customer")
    .map((kpi, index) => {
      if (index === 0) {
        return { ...kpi, categoryDescription: kpi.categoryDescription };
      }
      return { ...kpi, categoryDescription: "" };
    });

  const allFinancial = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Financial")
    .map((kpi, index) => {
      if (index === 0) {
        return { ...kpi, categoryDescription: kpi.categoryDescription };
      }
      return { ...kpi, categoryDescription: "" };
    });

  const allCapacityDevelopment = details?.kpis
    ?.filter((kpi) => kpi.categoryDescription === "Capacity Development")
    .map((kpi, index) => {
      if (index === 0) {
        return { ...kpi, categoryDescription: kpi.categoryDescription };
      }
      return { ...kpi, categoryDescription: "" };
    });

  const { loading: updateAppraiseLoading } = useSelector(
    (state) => state.performanceManagement.updateAppraisalByReferenceReducer
  );

  const submitComment = () => {
    const payload = {
      staffComment: comment,
      status,
      appraisalReference,
      recommendation: "",
      secondLevelSupervisorComment: "",
    };
    const data = {
      payload,
      history,
      name: "comment",
    };
    console.log(">>>>>>comment", payload);
    dispatch(updateCommentSection(data));
  };

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  useEffect(() => {
    dispatch(getAppraisalByReferenceId(appraisalReference));
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile - admin Template</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Appraisal Review</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrms/Appraisals">Back to Appraisal Page</Link>
                </li>
                <li className="breadcrumb-item active">Review</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50">
          <div className="card-body">
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
                                    STAFF ID
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
                                    {secondLevelSupervisorName}
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
                                <div className="col-lg-1 text-center">
                                  TARGET
                                </div>
                                <div className="col-lg-1 text-center">
                                  WEIGHT
                                </div>
                                <div className="col-lg-1 text-center">
                                  APP. RATE
                                </div>
                                <div className="col-lg-2 text-center">
                                  APP. RESULT
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
                      <div className="col-lg-12 d-flex border-bottom pt-3 pb-3">
                        <div className="col-lg-2">TOTAL</div>
                        <div className="col-lg-3"></div>
                        <div className="col-lg-1 text-center"></div>
                        <div className="col-lg-1 text-center"></div>
                        <div className="col-lg-1 text-center"></div>
                        <div
                          className="col-lg-2 text-center"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bolder",
                          }}
                        >
                          {totalAppraiseeResult?.toFixed()}
                        </div>
                        <div className="col-lg-1 text-center"></div>
                        <div
                          className="col-lg-1 text-center"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bolder",
                          }}
                        >
                          {totalSupervisorResult}
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
                    <div className="col-lg-12  user-name">STRENGTHS RATING</div>
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
                              <h4 className="col-lg-4">Appraisee Rating</h4>
                              <h4 className="col-lg-4">Supervisor Rating</h4>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}

                        <div className="d-flex mt-3 mb-3 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <div className="col-lg-4">Time Management</div>

                            <div className="col-lg-4">
                              <div id="ratings_group">
                                {appraiseeTimeManagementScore}/5
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {supervisorTimeManagementScore}/5
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-3 mb-3 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <div className="col-lg-4">Punctuality</div>

                            <div className="col-lg-4">
                              <div id="ratings_group">
                                {appraiseePunctualityScore}/5
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {supervisorPunctualityScore}/5
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-3 mb-3 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <div className="col-lg-4">Professional Conduct</div>

                            <div className="col-lg-4">
                              <div id="ratings_group">
                                {appraiseeProfessionalConductScore}/5
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {supervisorProfessionalConductScore}/5
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-3 mb-3 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <div className="col-lg-4">Time Communication</div>

                            <div className="col-lg-4">
                              <div id="ratings_group">
                                {appraiseeCommunicationScore}/5
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {supervisorCommunicationScore}/5
                            </div>
                          </div>
                        </div>

                        <div className="d-flex mt-3 mb-3 border-bottom">
                          <div className="col-lg-12 d-flex">
                            <div className="col-lg-4">Analytic Thinking</div>

                            <div className="col-lg-4">
                              <div id="ratings_group">
                                {appraiseeAnalyticalThinkingScore}/5
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {supervisorAnalyticalThinkingScore}/5
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

                            <div className="col-lg-4">
                              {appraiseeStrengthScore
                                ? appraiseeStrengthScore
                                : 0}
                              /25
                            </div>
                            <div className="col-lg-4">
                              {supervisorStrengthScore
                                ? supervisorStrengthScore
                                : 0}
                              /25
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
                                  Very Good{" "}
                                  <span className="float-right">4</span>
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
                    <div className="col-lg-12  user-name">TRAININGS</div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="profile-view d-flex">
                        <div className="col-lg-6">
                          <div className="panel panel-default">
                            <div className="panel-heading text-center font-weight-bold">
                              BEHAVIOURAL TRAINING
                            </div>
                            <div className="panel-body">
                              <div className="m-3 mb-3 border-bottom-2">
                                <div className="form-group">
                                  <label>
                                    My Suggested Behavioral Training:
                                  </label>
                                  {appraiseeBehaviouralTrainings}
                                </div>
                              </div>

                              <div className="m-3 border-bottom-1">
                                <div className="form-group">
                                  <label>
                                    Supervisor's Suggested Behavioral Training:
                                  </label>
                                  {!supervisorBehaviouralTrainings ? (
                                    <p className="error-color">
                                      No Supervisor's Suggestions Yet
                                    </p>
                                  ) : (
                                    supervisorBehaviouralTrainings
                                  )}
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
                            <div className="panel-body">
                              <div className="m-3 mb-3">
                                <div className="form-group">
                                  <label>
                                    My Suggested Functional Training:
                                  </label>
                                  {appraiseeFunctionalTrainings}
                                </div>
                              </div>
                              <div className="m-3">
                                <div className="form-group">
                                  <label>
                                    Supervisor's Suggested Functional Training:
                                  </label>
                                  {!supervisorFunctionalTrainings ? (
                                    <p className="error-color">
                                      No Supervisor's Suggestions Yet
                                    </p>
                                  ) : (
                                    supervisorFunctionalTrainings
                                  )}
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
                            EXCEPTIONAL ACHIEVEMENTS
                          </div>
                          {exceptionalAchievement}
                        </div>

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
                          {supervisorComment ? (
                            supervisorComment
                          ) : (
                            <p className="error-color">
                              No supervisor comment yet
                            </p>
                          )}
                        </div>

                        {status === "PROCESSING" && (
                          <div className="form-group">
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
                              <textarea
                                onChange={(e) => setComment(e.target.value)}
                                className="form-control mb-3 "
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        )}

                        {/* {status === "PROCESSING" && (
                          <div className="form-group">
                            <div
                              className="mb-3 font-weight-bold"
                              style={{
                                marginBottom: "20px",
                                textDecoration: "underline",
                              }}
                            >
                              MY COMMENT
                            </div>
                            <div className="mb-3">{appraiseeComment}</div>
                          </div>
                        )} */}

                        {status === "COMPLETE" && (
                          <div className="form-group">
                            <div
                              className="mb-3 font-weight-bold"
                              style={{
                                marginBottom: "20px",
                                textDecoration: "underline",
                              }}
                            >
                              MY COMMENT
                            </div>
                            <div className="mb-3">{appraiseeComment}</div>
                          </div>
                        )}

                        {status === "INPROGRESS" && (
                          <div className="form-group">
                            <div
                              className="mb-3 font-weight-bold"
                              style={{
                                marginBottom: "20px",
                                textDecoration: "underline",
                              }}
                            >
                              MY COMMENT
                            </div>
                            <div className="mb-3">{appraiseeComment}</div>
                          </div>
                        )}

                        {status === "REJECTED" && rejectionStage === 2 && (
                          <div className="form-group">
                            <div
                              className="mb-3 font-weight-bold"
                              style={{
                                marginBottom: "20px",
                                textDecoration: "underline",
                              }}
                            >
                              REASON FOR REJECTION
                            </div>
                            <div className="mb-3">{reasonForRejection}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Supervisor's Comments Ends Here */}
                </div>

                {/* Submit Appraisal Button */}
                {rejectionStage === 2 ? (
                  <div
                    className="form-group col-lg-12 col-md-12 col-sm-12"
                    style={{ marginTop: "50px" }}
                  >
                    <Link to={"/hrms/staffAppraisal"}>
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                          <button
                            href="#"
                            className="btn btn-block btn-suntrust font-weight-700"
                          >
                            {updateAppraiseLoading ? (
                              <Loader />
                            ) : (
                              "CREATE NEW APPRAISAL"
                            )}
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div
                    className="form-group col-lg-12 col-md-12 col-sm-12"
                    style={{ marginTop: "50px" }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                        <button
                          disabled={status === "SUBMITTED" || comment === ""}
                          href="#"
                          className="btn btn-block btn-suntrust font-weight-700"
                          onClick={() => toggleModal()}
                        >
                          {updateAppraiseLoading ? <Loader /> : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* /Page Content */}
            </div>
          </div>
        </div>
      </div>

      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-90w  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Appraisal Comment</h3>
                <p>Are you sure you want to proceed</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-block btn-primary"
                      onClick={() => {
                        submitComment();
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

export default AppraiseeUpdatedReview;
