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
import { addSelect } from "../../utils/helper";
import { useParams } from "react-router-dom";
import { getStrengths } from "../../services/PerformanceManagement/StaffAppraisal/getStrengths";
import { RadioInput } from "../../components/RadioInput/index";
import { getAppraisalByReferenceId } from "../../services/PerformanceManagement/StaffAppraisal/getAppraisalByReference";
import { updateName } from "../../utils/helper";
import { getTechnicalTraining } from "../../services/PerformanceManagement/StaffAppraisal/getTechnicalTraining";
import { getBehaviouralTraining } from "../../services/PerformanceManagement/StaffAppraisal/getBehaviouralTraining";
import { getIndividualKpis } from "../../services/PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import RejectionModal from "../../components/RejectionModal";
import Modal from "react-bootstrap/Modal";
import { NewSupervisorKpiInputComponent } from '../../components/KpiComponent/index';

const StaffAppraisalDetail = () => {
  const dispatch = useDispatch();
  const [timeManagementScore, setTimeManagementScore] = useState(0);
  const [punctualityScore, setPunctualityScore] = useState(0);
  const [analyticScore, setAnalyticScore] = useState(0);
  const [professionalScore, setProfessionalScore] = useState(0);
  const [communicationScore, setCommunicationScore] = useState(0);
  const [strengthResult, setStrengthResult] = useState(0);
  const [technic, setTechnic] = useState("");
  const [behavior, setBehavior] = useState("");
  const [values, setValues] = useState({});
  const [appraiseeResults, setAppraiseeResults] = useState({});
  const [allKPIs, setAllKPIs] = useState([]);
  const [supervisorComment, setSupervisorComment] = useState("");
  const [allSupervisorResults, setAllSupervisorResults] = useState({});
  const { state, actions } = useStateMachine({ updateName });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [recommend, setRecommendation] = useState("");
  const [selectedBehavioralTrainings, setSelectedBehavioralTraining] = useState(
    []
  );
  const [selectedTechnicalTrainings, setSelectedTechnicalTraining] = useState(
    []
  );
  const [kpiResult, setKpiResult] = useState(0);

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  const { departmentName, gradeName, unitName } =
    staffData;

  const errorValues = Object.values(errors);
  const allValues = Object.values(values).filter((el) => el !== "");

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleBehaviorChange = (e) => {
    if (selectedBehavioralTrainings.includes(e.target.value)) {
      return;
    }
    if (selectedBehavioralTrainings.length === 3) {
      return;
    }
    setSelectedBehavioralTraining((prev) => [...prev, e.target.value]);
  };

  const handleTechnicalChange = (e) => {
    if (selectedTechnicalTrainings.includes(e.target.value)) {
      return;
    }
    if (selectedTechnicalTrainings.length === 3) {
      return;
    }
    setSelectedTechnicalTraining((prev) => [...prev, e.target.value]);
  };

  const deleteBehaviorTraining = (training) => {
    setSelectedBehavioralTraining(
      selectedBehavioralTrainings.filter((behavior) => behavior !== training)
    );
  };

  const deleteTechnicalTraining = (training) => {
    setSelectedTechnicalTraining(
      selectedTechnicalTrainings.filter((technical) => technical !== training)
    );
  };

  const { appraisalReference } = useParams();

  const { data: behaviouralTrainings } = useSelector(
    (state) => state.performanceManagement.getBehaviouralTrainingReducer
  );
  const { data: technicalTrainings } = useSelector(
    (state) => state.performanceManagement.getTechnicalTrainingReducer
  );

  const { data: strengthIndicators } = useSelector(
    (state) => state.performanceManagement.getStrengthsReducer
  );

  const { data: details } = useSelector(
    (state) => state.performanceManagement.getAppraisalByReferenceReducer
  );

  const { data: KPIs } = useSelector(
    (state) => state.performanceManagement.getIndividualKpisReducer
  );

  const {
    appraisalPeriodStatus,
    appraiseeName,
    supervisorId,
    supervisorName,
    secondSupervisorName,
    secondLevelSupervisorId,
    exceptionalAchievement,
    dateSubmitted,
    status,
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
    kpis,
  } = details;

  const appraiseeStrengthScore =
    Number(appraiseeTimeManagementScore) +
    Number(appraiseeProfessionalConductScore) +
    Number(appraiseeAnalyticalThinkingScore) +
    Number(appraiseePunctualityScore) +
    Number(appraiseeCommunicationScore);

  const updateValues = (e, id, kpi) => {
    let { value, min, max } = e.target;
    if (value > Number(kpi.measurableTarget) && kpi.kpiId === id) {
      value = "";
      setErrors({ ...errors, [id]: true });
    } else {
      setErrors({ ...errors, [id]: false });
    }

    //computation of target and weightScore
    const result = ((value / kpi.measurableTarget) * kpi.weightedScore) / 1;

    //values for supervisorRate is set
    setValues({ ...values, [id]: value });

    //values for supervisorResults is set
    setAllSupervisorResults({ ...allSupervisorResults, [id]: result });

    setAppraiseeResults({ ...appraiseeResults, [id]: result });
  };

  const resultValues = Object.values(allSupervisorResults);

  const result = resultValues
    ?.reduce((acc, num) => {
      return Number(acc) + Number(num);
    }, 0)
    .toFixed();

  useEffect(() => {
    setKpiResult(result);
  });

  //add kpi data to the stateMachine
  const addKPIsToState = () => {
    state.data = {
      supervisorBehaviouralTrainings: `${
        selectedBehavioralTrainings[0] ? selectedBehavioralTrainings[0] : ""
      }, ${
        selectedBehavioralTrainings[1] ? selectedBehavioralTrainings[1] : ""
      }, ${
        selectedBehavioralTrainings[2] ? selectedBehavioralTrainings[2] : ""
      }`,

      supervisorFunctionalTrainings: `${
        selectedTechnicalTrainings[0] ? selectedTechnicalTrainings[0] : ""
      },  ${
        selectedTechnicalTrainings[1] ? selectedTechnicalTrainings[1] : ""
      }, ${selectedTechnicalTrainings[2] ? selectedTechnicalTrainings[2] : ""}`,
      behaviouralTrainingsArray: selectedBehavioralTrainings,
      functionalTrainingsArray: selectedTechnicalTrainings,
      supervisorComment,
      secondLevelSupervisorComment: "",
      strengthScore: Number(strengthResult),
      supervisorRates: values,
      supervisorResults: allSupervisorResults,
      supervisorTimeManagementScore: timeManagementScore,
      supervisorPunctualityScore: punctualityScore,
      supervisorProfessionalConductScore: professionalScore,
      supervisorCommunicationScore: communicationScore,
      supervisorAnalyticalThinkingScore: analyticScore,
      recommendation: recommend,
      appraiseeStrengthScore,
    };

    // console.log(">>>>>state.data", state.data);
    actions.updateName(state.data);
  };

  console.log(">>>>>>details", details)

  //
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

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  useEffect(() => {
    dispatch(getBehaviouralTraining());
  }, []);

  useEffect(() => {
    dispatch(getTechnicalTraining());
  }, []);

  useEffect(() => {
    dispatch(getStrengths());
  }, []);

  useEffect(() => {
    const strengthRes =
      Number(punctualityScore) +
      Number(analyticScore) +
      Number(professionalScore) +
      Number(communicationScore) +
      Number(timeManagementScore);
    setStrengthResult(strengthRes);
  }, [
    punctualityScore,
    analyticScore,
    professionalScore,
    communicationScore,
    timeManagementScore,
  ]);

  const allBehaviourals = addSelect(behaviouralTrainings, {
    id: "",
    description: "-Select-",
  });
  const allTechnicals = addSelect(technicalTrainings, {
    id: "",
    description: "-Select-",
  });

  useEffect(() => {
    dispatch(getAppraisalByReferenceId(appraisalReference));
  }, []);

  useEffect(() => {
    dispatch(getIndividualKpis());
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile - HRMS admin Template</title>
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
                  <Link to="/hrms/allStaffAppraisals">
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
                                    {lastPromotionDate}
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

                                {/* <div className="d-flex m-b-10 font_size">
                                  <div className="col-lg-5 col-md-6 col-sm-12 font-weight-bold">
                                    APPRAISER:
                                  </div>
                                  <div className="col-lg-7 col-md-6 col-sm-12">
                                    Demarai Gray
                                  </div>
                                </div> */}

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
                                  ACTUAL
                                </div>
                                <div className="col-lg-1 text-center">
                                  POINTS
                                </div>
                              </div>
                              {/* Table Header Ends Here */}

                              {/* Financial Review Starts Here */}
                              {allFinancial?.map((kpi) => {
                                return (
                                  <NewSupervisorKpiInputComponent
                                    errors={errors}
                                    kpi={kpi}
                                    values={values}
                                    appraiseeResults={appraiseeResults}
                                    updateValues={updateValues}
                                  />
                                );
                              })}

                              {allCustomer?.map((kpi) => {
                                return (
                                  <NewSupervisorKpiInputComponent
                                    errors={errors}
                                    kpi={kpi}
                                    values={values}
                                    appraiseeResults={appraiseeResults}
                                    updateValues={updateValues}
                                  />
                                );
                              })}

                              {/* Process Review Starts Here */}
                              {allProcess?.map((kpi) => {
                                return (
                                  <NewSupervisorKpiInputComponent
                                    errors={errors}
                                    kpi={kpi}
                                    values={values}
                                    appraiseeResults={appraiseeResults}
                                    updateValues={updateValues}
                                  />
                                );
                              })}

                              {allCapacityDevelopment?.map((kpi) => {
                                return (
                                  <NewSupervisorKpiInputComponent
                                    errors={errors}
                                    kpi={kpi}
                                    values={values}
                                    appraiseeResults={appraiseeResults}
                                    updateValues={updateValues}
                                  />
                                );
                              })}

                              {/* Financial Review Ends Here */}
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
                              <div className="col-lg-2 text-center">
                                {totalAppraiseeResult?.toFixed()}/100
                              </div>
                              <div className="col-lg-1 text-center"></div>
                              <div
                                className="col-lg-1 text-center"
                                style={{
                                  color: "btn-suntrust",
                                  fontSize: "16px",
                                  fontWeight: "bolder",
                                }}
                              >
                                {" "}
                                {kpiResult}/100
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

                          <div className="d-flex mt-3 mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Time Management</div>

                              <div className="col-lg-4">
                                <div id="ratings_group">
                                  <RadioInput
                                    label="1"
                                    value="1"
                                    checked={timeManagementScore}
                                    setter={setTimeManagementScore}
                                  />
                                  <RadioInput
                                    label="2"
                                    value="2"
                                    checked={timeManagementScore}
                                    setter={setTimeManagementScore}
                                  />
                                  <RadioInput
                                    label="3"
                                    value="3"
                                    checked={timeManagementScore}
                                    setter={setTimeManagementScore}
                                  />
                                  <RadioInput
                                    label="4"
                                    value="4"
                                    checked={timeManagementScore}
                                    setter={setTimeManagementScore}
                                  />
                                  <RadioInput
                                    label="5"
                                    value="5"
                                    checked={timeManagementScore}
                                    setter={setTimeManagementScore}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                {appraiseeTimeManagementScore}/5
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Punctuality</div>

                              <div className="col-lg-4">
                                <div id="ratings_group">
                                  <RadioInput
                                    label="1"
                                    value={1}
                                    checked={punctualityScore}
                                    setter={setPunctualityScore}
                                  />
                                  <RadioInput
                                    label="2"
                                    value={2}
                                    checked={punctualityScore}
                                    setter={setPunctualityScore}
                                  />
                                  <RadioInput
                                    label="3"
                                    value={3}
                                    checked={punctualityScore}
                                    setter={setPunctualityScore}
                                  />
                                  <RadioInput
                                    label="4"
                                    value={4}
                                    checked={punctualityScore}
                                    setter={setPunctualityScore}
                                  />
                                  <RadioInput
                                    label="5"
                                    value={5}
                                    checked={punctualityScore}
                                    setter={setPunctualityScore}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                {appraiseePunctualityScore}/5
                              </div>
                            </div>
                          </div>

                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Professional Conduct
                              </div>

                              <div className="col-lg-4">
                                <div id="ratings_group">
                                  <RadioInput
                                    label="1"
                                    value={1}
                                    checked={professionalScore}
                                    setter={setProfessionalScore}
                                  />
                                  <RadioInput
                                    label="2"
                                    value={2}
                                    checked={professionalScore}
                                    setter={setProfessionalScore}
                                  />
                                  <RadioInput
                                    label="3"
                                    value={3}
                                    checked={professionalScore}
                                    setter={setProfessionalScore}
                                  />
                                  <RadioInput
                                    label="4"
                                    value={4}
                                    checked={professionalScore}
                                    setter={setProfessionalScore}
                                  />
                                  <RadioInput
                                    label="5"
                                    value={5}
                                    checked={professionalScore}
                                    setter={setProfessionalScore}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                {appraiseeProfessionalConductScore}/5
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Communication</div>

                              <div className="col-lg-4">
                                <div id="ratings_group">
                                  <RadioInput
                                    label="1"
                                    value={1}
                                    checked={communicationScore}
                                    setter={setCommunicationScore}
                                  />
                                  <RadioInput
                                    label="2"
                                    value={2}
                                    checked={communicationScore}
                                    setter={setCommunicationScore}
                                  />
                                  <RadioInput
                                    label="3"
                                    value={3}
                                    checked={communicationScore}
                                    setter={setCommunicationScore}
                                  />
                                  <RadioInput
                                    label="4"
                                    value={4}
                                    checked={communicationScore}
                                    setter={setCommunicationScore}
                                  />
                                  <RadioInput
                                    label="5"
                                    value={5}
                                    checked={communicationScore}
                                    setter={setCommunicationScore}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                {appraiseeCommunicationScore}/5
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Analytical Thinking
                              </div>

                              <div className="col-lg-4">
                                <div id="ratings_group">
                                  <RadioInput
                                    label="1"
                                    value={1}
                                    checked={analyticScore}
                                    setter={setAnalyticScore}
                                  />
                                  <RadioInput
                                    label="2"
                                    value={2}
                                    checked={analyticScore}
                                    setter={setAnalyticScore}
                                  />
                                  <RadioInput
                                    label="3"
                                    value={3}
                                    checked={analyticScore}
                                    setter={setAnalyticScore}
                                  />
                                  <RadioInput
                                    label="4"
                                    value={4}
                                    checked={analyticScore}
                                    setter={setAnalyticScore}
                                  />
                                  <RadioInput
                                    label="5"
                                    value={5}
                                    checked={analyticScore}
                                    setter={setAnalyticScore}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                {appraiseeAnalyticalThinkingScore}/5
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                        <div className="d-flex border-bottom">
                          <div
                            className="col-lg-12 pt-3 pb-3 d-flex"
                            style={{
                              fontWeight: "bolder",
                              backgroundColor: "#efefef",
                            }}
                          >
                            <div className="col-lg-4">TOTAL</div>

                            <div className="col-lg-4">{strengthResult}/25</div>
                            <div className="col-lg-4">
                              {appraiseeStrengthScore
                                ? appraiseeStrengthScore
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
                            <div className="panel-body">
                              <div className="m-3">
                                <div className="form-group">
                                  <label>Suggest a Behavioural Training:</label>
                                  <select
                                    className="form-control"
                                    value={behavior}
                                    onChange={(e) => handleBehaviorChange(e)}
                                  >
                                    {allBehaviourals?.map((behaviour) => {
                                      return (
                                        <option
                                          key={behaviour?.id}
                                          value={behaviour?.description}
                                        >
                                          {behaviour?.description}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <div className="selected_items mt-2">
                                    {selectedBehavioralTrainings?.map(
                                      (training) => {
                                        return (
                                          <ul className="d-flex">
                                            <li className=" pr-20">
                                              {training}
                                            </li>
                                            <i
                                              onClick={() =>
                                                deleteBehaviorTraining(training)
                                              }
                                              className="fa fa-window-close pt-1 cursor"
                                              aria-hidden="true"
                                            ></i>
                                          </ul>
                                        );
                                      }
                                    )}
                                  </div>
                                  <label className="mt-3">
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
                            <div className="panel-body">
                              <div className="m-3">
                                <div className="form-group">
                                  <label>Suggest a Functional Training:</label>
                                  <select
                                    className="form-control"
                                    value={technic}
                                    onChange={(e) => handleTechnicalChange(e)}
                                  >
                                    {allTechnicals?.map((technical) => {
                                      return (
                                        <option
                                          key={technical?.id}
                                          value={technical?.description}
                                        >
                                          {technical?.description}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  <div className="selected_items mt-2">
                                    {selectedTechnicalTrainings?.map(
                                      (training) => {
                                        return (
                                          <ul className="d-flex">
                                            <li className=" pr-20">
                                              {training}
                                            </li>
                                            <i
                                              onClick={() =>
                                                deleteTechnicalTraining(
                                                  training
                                                )
                                              }
                                              className="fa fa-window-close pt-1 cursor"
                                              aria-hidden="true"
                                            ></i>
                                          </ul>
                                        );
                                      }
                                    )}
                                  </div>
                                  <label className="mt-3">
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
                            APPRAISEE'S ACHIEVEMENTS
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
                          <textarea
                            className="form-control mb-3 "
                            defaultValue={""}
                            onChange={(e) =>
                              setSupervisorComment(e.target.value)
                            }
                          />
                        </div>
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

                        <div className="form-group ">
                          <select
                            className="form-control"
                            value={recommend}
                            onChange={(e) => setRecommendation(e.target.value)}
                          >
                            <option value="">-Select-</option>
                            <option value="Maintain Status">
                              Maintain Status
                            </option>
                            <option value="Promote">Promote</option>
                            <option value="Watch Performance">
                              Watch Performance
                            </option>
                            <option value="Re-assign">Reassign </option>
                            <option value="Exit">Exit </option>
                          </select>
                        </div>
                      </div>

                      <div
                        className="col-lg-4"
                        style={{ marginTop: "50px" }}
                      ></div>
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
                    <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                      <button
                        className="btn btn-block btn-outline-danger font-weight-700"
                        onClick={() => toggleModal()}
                      >
                        REJECT
                      </button>
                    </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                      <button
                        className="btn btn-block btn-suntrust font-weight-700"
                        disabled={
                          errorValues.includes(true) ||
                          // KPIs.length !== allValues.length ||
                          !supervisorComment
                        }
                        onClick={() => {
                          addKPIsToState();
                          history.push(
                            `/SupervisorAppraisalReview/${appraisalReference}`
                          );
                        }}
                      >
                        PREVIEW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Content */}
            </div>
          </div>
          <Modal show={openModal} centered backdrop="static" keyboard={false}>
            <RejectionModal
              toggleModal={toggleModal}
              supervisorName={supervisorName}
              appraisalReference={appraisalReference}
              status={status}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default StaffAppraisalDetail;
