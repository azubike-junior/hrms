import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useStateMachine } from "little-state-machine";
import { getCategoryTypes } from "../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
// import { NewKpiInputComponent } from "../PerformanceManagement/KpiComponent";
import { getIndividualKpis } from "../../services/PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import {
  addSelect,
  emptyValue,
  getUniqueValues,
  updateName,
  emptyStateData,
} from "../../utils/helper";
import { NewKpiInputComponent } from "../../components/KpiComponent";
import { getBehaviouralTraining } from "../../services/PerformanceManagement/StaffAppraisal/getBehaviouralTraining";
import { getTechnicalTraining } from "../../services/PerformanceManagement/StaffAppraisal/getTechnicalTraining";
import { getStrengths } from "../../services/PerformanceManagement/StaffAppraisal/getStrengths";
import { getAllStaffs } from "../../services/PerformanceManagement/Configurations/staffs/getAllStaffs";
import { getKpiByJobFunction } from "../../services/PerformanceManagement/Configurations/individualKpi/getKpibyJobFunction";
import Swal from "sweetalert2";
import { RadioInput } from "../../components/RadioInput";

const StaffAppraisal = (props) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [stuffs, setStuff] = useState({});
  const [kpiResult, setKpiResult] = useState("");
  const [appraiseeResults, setAppraiseeResults] = useState({});
  const [allKPIs, setAllKPIs] = useState([]);
  const [exceptionalAch, setExceptionalAch] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [technic, setTechnic] = useState("");
  const [behavior, setBehavior] = useState("");
  const [timeManagementScore, setTimeManagementScore] = useState(0);
  const [punctualityScore, setPunctualityScore] = useState(0);
  const [analyticScore, setAnalyticScore] = useState(0);
  const [professionalScore, setProfessionalScore] = useState(0);
  const [communicationScore, setCommunicationScore] = useState(0);
  const [strengthResult, setStrengthResult] = useState(0);
  const [secondLevelSupervisor, setSecondLevelSupervisor] = useState("");
  const { state, actions } = useStateMachine({ updateName });

  // const [selectedBehavioralTrainings, setSelectedBehavioralTraining] = useState(
  //   []
  // );
  // const [selectedTechnicalTrainings, setSelectedTechnicalTraining] = useState(
  //   []
  // );

  const errorValues = Object.values(errors);

  const { data: allStaffs } = useSelector((state) => state.getAllStaffsReducer);

  const { response } = useSelector(
    (state) => state.authenticationManager.loginReducer
  );

  // console.log(">>>>>allStaffs", allStaffs);

  const allValues = Object.values(state?.data?.appraiseeRates)?.filter(
    (el) => el !== ""
  );

  const handleBehaviorChange = (e) => {
    if (state?.data?.selectedBehavioralTrainings?.includes(e.target.value)) {
      return;
    }
    if (state?.data?.selectedBehavioralTrainings?.length === 3) {
      return;
    }
    actions.updateName({
      ...state.data,
      selectedBehavioralTrainings: [
        ...state.data.selectedBehavioralTrainings,
        e.target.value,
      ],
    });
  };

  const handleTechnicalChange = (e) => {
    if (state?.data?.selectedTechnicalTrainings?.includes(e.target.value)) {
      return;
    }
    if (state?.data?.selectedTechnicalTrainings?.length === 3) {
      return;
    }
    actions.updateName({
      ...state.data,
      selectedTechnicalTrainings: [
        ...state.data.selectedTechnicalTrainings,
        e.target.value,
      ],
    });
    // setSelectedTechnicalTraining((prev) => [...prev, e.target.value]);
  };

  const deleteBehaviorTraining = (training) => {
    // setSelectedBehavioralTraining(
    //   selectedBehavioralTrainings.filter((behavior) => behavior !== training)
    // );
    const behavioralTrainings = state?.data?.selectedBehavioralTrainings.filter(
      (behavior) => behavior !== training
    );

    actions.updateName({
      ...state.data,
      selectedBehavioralTrainings: [...behavioralTrainings],
    });
  };

  const deleteTechnicalTraining = (training) => {
    // setSelectedTechnicalTraining(
    //   selectedTechnicalTrainings.filter((technical) => technical !== training)
    // );

    const technicalTrainings = state?.data?.selectedTechnicalTrainings.filter(
      (technical) => technical !== training
    );

    actions.updateName({
      ...state.data,
      selectedTechnicalTrainings: [...technicalTrainings],
    });
  };

  const { data: KPIs } = useSelector(
    (state) => state.performanceManagement.getIndividualKpisReducer
  );

  const { data: jobKpis } = useSelector(
    (state) => state.performanceManagement.getKpiByJobFunctionReducer
  );

  console.log(">>>>>jobKpi", jobKpis);

  const { data: behaviouralTrainings } = useSelector(
    (state) => state.performanceManagement.getBehaviouralTrainingReducer
  );
  const { data: technicalTrainings } = useSelector(
    (state) => state.performanceManagement.getTechnicalTrainingReducer
  );

  const { data: strengthIndicators } = useSelector(
    (state) => state.performanceManagement.getStrengthsReducer
  );

  const { data: categories } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  let results = [];

  for (let category = 0; category < categories.length; category++) {
    results.push(
      jobKpis?.filter((kpi) => kpi.category == categories[category].description)
    );
  }

  const updateValues = (e, id, kpi, index) => {
    // console.log(
    //   ">>>>>>>keys",
    //   Object.values(state?.data?.appraisalResults).length
    // );
    // if (Object.values(state?.data?.appraisalResults).length > 0) {
    //   e.target.value = "";
    //   return actions.updateName(emptyValue);
    // }
    let { value, min, max } = e.target;
    if (value > Number(kpi.measurableTarget) && kpi.id === id) {
      value = "";
      setErrors({ ...errors, [id]: true });
    } else {
      setErrors({ ...errors, [id]: false });
    }

    const result = ((value / kpi.measurableTarget) * kpi.weightedScore) / 1;

    // setValues({ ...values, [id]: value });

    setStuff({ ...stuffs, [id]: result });

    setAppraiseeResults({ ...appraiseeResults, [id]: result });

    actions.updateName({
      ...state.data,
      values: { ...state.data.values, [id]: value },
      appraiseeResults: { ...state.data.appraiseeResults, [id]: result },
      appraiseeRates: { ...state.data.values, [id]: value },
    });
  };

  // console.log(">>>>>>values", values, state.data.values);

  const resultValues = Object.values(appraiseeResults);

  const result = resultValues
    ?.reduce((acc, num) => {
      return Number(acc) + Number(num);
    }, 0)
    .toFixed();

  let stateResult = Object.values(state?.data?.appraiseeResults)
    ?.reduce((acc, num) => {
      return Number(acc) + Number(num);
    }, 0)
    .toFixed();

  useEffect(() => {
    setKpiResult(result);
  });

  const { selectedBehavioralTrainings, selectedTechnicalTrainings } =
    state?.data;

  // console.log(">>>>>>>selected", selectedBehavioralTrainings)

  const addKPIsToState = () => {
    const data = {
      kpiResult,
      appraisalRates: values,
      appraisalResults: stuffs,
      appraiseeTimeManagementScore: timeManagementScore,
      appraiseePunctualityScore: punctualityScore,
      appraiseeCommunicationScore: communicationScore,
      appraiseeProfessionalConductScore: professionalScore,
      appraiseeAnalyticalThinkingScore: analyticScore,
      appraiseeBehaviouralTrainings: `${
        selectedBehavioralTrainings[0] ? selectedBehavioralTrainings[0] : ""
      }, ${
        selectedBehavioralTrainings[1] ? selectedBehavioralTrainings[1] : ""
      }, ${
        selectedBehavioralTrainings[2] ? selectedBehavioralTrainings[2] : ""
      }`,
      appraiseeFunctionalTrainings: `${
        selectedTechnicalTrainings[0] ? selectedTechnicalTrainings[0] : ""
      },  ${
        selectedTechnicalTrainings[1] ? selectedTechnicalTrainings[1] : ""
      }, ${selectedTechnicalTrainings[2] ? selectedTechnicalTrainings[2] : ""}`,
      appraiseeBehaviourArray: selectedBehavioralTrainings,
      appraiseeFunctionalArray: selectedTechnicalTrainings,
      exceptionalAchievement: exceptionalAch
        ? exceptionalAch
        : state?.data?.exceptionalAchievement,
      selectedBehavioralTrainings,
      selectedTechnicalTrainings,
      rateResult: stateResult,
      // appraiseeResults: stuffs,
      // appraiseeRates: values,
      secondSupervisorName: secondSupervisorDetails[0],
      secondLevelSupervisorId: secondSupervisorDetails[1],
      strengthResult: strengthResult
        ? strengthResult
        : state.data.strengthResult,
    };

    state.data = {
      ...data,
      appraiseeResults: state?.data?.appraiseeResults,
      appraiseeRates: state?.data?.appraiseeRates,
      values: state?.data?.values,
      // strengthResult: state?.data?.strengthResult
    };

    actions.updateName(state.data);
    history.push("/hrms/staffAppraisalReview");
  };

  const secondSupervisorDetails = secondLevelSupervisor.split(" + ");

  // console.log(">>>details", secondSupervisorDetails)

  const addUpdatedDataToState = () => {
    const updatedData = {
      appraiseeTimeManagementScore: timeManagementScore,
      appraiseePunctualityScore: punctualityScore,
      appraiseeCommunicationScore: communicationScore,
      appraiseeProfessionalConductScore: professionalScore,
      appraiseeAnalyticalThinkingScore: analyticScore,
      appraiseeBehaviouralTrainings: `${
        selectedBehavioralTrainings[0] ? selectedBehavioralTrainings[0] : ""
      }, ${
        selectedBehavioralTrainings[1] ? selectedBehavioralTrainings[1] : ""
      }, ${
        selectedBehavioralTrainings[2] ? selectedBehavioralTrainings[2] : ""
      }`,
      appraiseeFunctionalTrainings: `${
        selectedTechnicalTrainings[0] ? selectedTechnicalTrainings[0] : ""
      },  ${
        selectedTechnicalTrainings[1] ? selectedTechnicalTrainings[1] : ""
      }, ${selectedTechnicalTrainings[2] ? selectedTechnicalTrainings[2] : ""}`,
      appraiseeBehaviourArray: selectedBehavioralTrainings,
      appraiseeFunctionalArray: selectedTechnicalTrainings,
      exceptionalAchievement: exceptionalAch
        ? exceptionalAch
        : state?.data?.exceptionalAchievement,
      selectedBehavioralTrainings,
      selectedTechnicalTrainings,
      secondSupervisorName: secondSupervisorDetails[0],
      secondLevelSupervisorId: secondSupervisorDetails[1],
    };
    // state.data = { ...updatedData };
    actions.updateName({
      ...state.data,
      ...updatedData,
    });
  };

  const allBehaviourals = addSelect(behaviouralTrainings, {
    id: "",
    description: "-Select-",
  });
  const allTechnicals = addSelect(technicalTrainings, {
    id: "",
    description: "-Select-",
  });

  const responseStatus = JSON.parse(localStorage.getItem("responseStatus"));
  const jobFunctionId = JSON.parse(localStorage.getItem("jobFunctionId"));

  useEffect(() => {
    if (responseStatus === 206) {
      Swal.fire({
        icon: "error",
        title: "One or more fields are missing in your profile.",
        text: " Kindly update your profile.",
        footer: '<a href="/hrms/setupProfile">Setup Profile</a>',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/hrms/setupProfile");
        }
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getAllStaffs());
  }, []);

  useEffect(() => {
    dispatch(getKpiByJobFunction(jobFunctionId ? jobFunctionId : 0));
  }, []);

  useEffect(() => {
    dispatch(getIndividualKpis());
  }, []);

  useEffect(() => {
    dispatch(getCategoryTypes());
  }, []);

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
    // actions.updateName({
    //   ...state.data,
    //   strengthResult: strengthRes
    // })
    setStrengthResult(strengthRes);
  }, [
    punctualityScore,
    analyticScore,
    professionalScore,
    communicationScore,
    timeManagementScore,
  ]);

  const processPerspective = results[0]?.map((kpi, index) => {
    if (index === 0) {
      return { ...kpi, category: kpi.category };
    }
    return { ...kpi, category: "" };
  });

  const customerPerspective = results[1]?.map((kpi, index) => {
    if (index === 0) {
      return { ...kpi, category: kpi.category };
    }
    return { ...kpi, category: "" };
  });

  const financialPerspective = results[2]?.map((kpi, index) => {
    if (index === 0) {
      return { ...kpi, category: kpi.category };
    }
    return { ...kpi, category: "" };
  });

  const capacityPerspective = results[3]?.map((kpi, index) => {
    if (index === 0) {
      return { ...kpi, category: kpi.category };
    }
    return { ...kpi, category: "" };
  });

  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>User Dashboard - HRMS Admin Template</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="card">
              <div className="card-body">
                <label className="font-18 font-weight-bold m-b-20">
                  APPRAISAL
                </label>

                <div className="profile-view">
                  <div
                    className="row d-flex border-bottom pt-2 pb-2 font-weight-bolder"
                    style={{ backgroundColor: "#cccccc", marginBottom: "10px" }}
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
                    <div className="card-body">
                      {/* Table Header  Starts Here */}
                      <div
                        className="col-lg-12 d-flex border-bottom pt-2 pb-2 font-weight-bolder"
                        style={{ backgroundColor: "#efefef" }}
                      >
                        <div className="col-lg-2">PERSPECTIVE</div>
                        <div className="col-lg-3">KPI</div>
                        <div className="col-lg-2 text-center">TARGET</div>
                        <div className="col-lg-2 text-center">WEIGHT</div>
                        <div className="col-lg-2 text-center">APP. RATE</div>
                        <div className="col-lg-1 text-center">APP. RESULT</div>
                      </div>
                      {/* Table Header Ends Here */}

                      {financialPerspective?.map((kpi) => {
                        return (
                          <NewKpiInputComponent
                            errors={errors}
                            kpi={kpi}
                            values={state?.data?.values}
                            // ref={inputRef}
                            defaultValue={state?.data?.values[kpi?.id]}
                            defaultRate={state?.data?.appraiseeResults[
                              kpi?.id
                            ]?.toFixed()}
                            appraiseeResults={appraiseeResults}
                            updateValues={updateValues}
                          />
                        );
                      })}

                      {customerPerspective?.map((kpi) => {
                        return (
                          <NewKpiInputComponent
                            errors={errors}
                            kpi={kpi}
                            values={state?.data?.values}
                            // ref={inputRef}
                            defaultValue={state?.data?.values[kpi?.id]}
                            defaultRate={state?.data?.appraiseeResults[
                              kpi?.id
                            ]?.toFixed()}
                            appraiseeResults={appraiseeResults}
                            updateValues={updateValues}
                          />
                        );
                      })}

                      {processPerspective?.map((kpi) => {
                        return (
                          <NewKpiInputComponent
                            errors={errors}
                            kpi={kpi}
                            values={state?.data?.values}
                            // ref={inputRef}
                            defaultValue={state?.data?.values[kpi?.id]}
                            defaultRate={state?.data?.appraiseeResults[
                              kpi?.id
                            ]?.toFixed()}
                            appraiseeResults={appraiseeResults}
                            updateValues={updateValues}
                          />
                        );
                      })}

                      {capacityPerspective?.map((kpi) => {
                        return (
                          <NewKpiInputComponent
                            errors={errors}
                            kpi={kpi}
                            // ref={inputRef}
                            defaultValue={state?.data?.values[kpi?.id]}
                            defaultRate={state?.data?.appraiseeResults[
                              kpi?.id
                            ]?.toFixed()}
                            values={state?.data?.values}
                            appraiseeResults={appraiseeResults}
                            updateValues={updateValues}
                          />
                        );
                      })}

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
                        <div className="col-lg-2 text-center"></div>
                        <div className="col-lg-2 text-center"></div>

                        <div
                          className="col-lg-2 text-center"
                          style={{
                            color: "btn-suntrust",
                            fontSize: "18px",
                            fontWeight: "bolder",
                          }}
                        >
                          {" "}
                          {stateResult}
                          /100
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
                              <h4 className="col-lg-8">Ratings</h4>
                            </div>
                          </div>

                          <div className="d-flex mt-3 mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Time Management</div>

                              <div className="col-lg-8">
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
                            </div>
                          </div>

                          <div className="d-flex mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Punctuality</div>

                              <div className="col-lg-8">
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
                            </div>
                          </div>

                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Professional Conduct
                              </div>

                              <div className="col-lg-8">
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
                            </div>
                          </div>
                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Communication</div>
                              <div className="col-lg-8">
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
                            </div>
                          </div>
                          <div className="d-flex border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Analytical Thinking
                              </div>

                              <div className="col-lg-8">
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

                            <div className="col-lg-8">
                              {strengthResult
                                ? strengthResult
                                : state.data.strengthResult}
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
                                7
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
                                    {state?.data?.selectedBehavioralTrainings?.map(
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
                                    {state?.data?.selectedTechnicalTrainings?.map(
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-12"
                        style={{ marginTop: "30px", marginBottom: "20px" }}
                      ></div>

                      <div
                        className="col-lg-4"
                        style={{ marginTop: "50px" }}
                      ></div>
                    </div>
                  </div>

                  <div
                    className="col-lg-12"
                    style={{ marginTop: "50px", marginBottom: "20px" }}
                  >
                    <div
                      className="font-weight-bolder"
                      style={{ textDecoration: "underline" }}
                    >
                      EXCEPTIONAL ACHIEVEMENTS
                    </div>

                    <div className="mt-3" style={{ marginBottom: "30px" }}>
                      <label>
                        If you have any exceptional achievements, provide it in
                        the field below:
                      </label>
                    </div>

                    <div className="form-group mb-5">
                      <textarea
                        onChange={(e) => setExceptionalAch(e.target.value)}
                        className="form-control mb-3 "
                        defaultValue={state?.data?.exceptionalAchievement}
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
                      SELECT SECOND LINE SUPERVISOR
                    </div>

                    <div className="form-group ">
                      <select
                        className="form-control"
                        value={secondLevelSupervisor}
                        onChange={(e) =>
                          setSecondLevelSupervisor(e.target.value)
                        }
                      >
                        <option value="">-Select-</option>
                        {allStaffs?.map((staff) => {
                          return (
                            <option
                              value={`${staff.staffName} + ${staff.staffId}`}
                            >
                              {staff.staffName}
                            </option>
                          );
                        })}
                        <option value="N/A">Not Available</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {Object.values(state?.data?.appraisalRates).length > 0 ? (
              <div
                className="form-group col-lg-12 col-md-12 col-sm-12"
                style={{ marginTop: "50px" }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                    <button
                      disabled={
                        // errorValues.includes(true) |
                        KPIs.length !== allValues.length
                      }
                      className="btn btn-block btn-suntrust font-weight-700"
                      onClick={() => {
                        // actions.updateName({ ...state.data });
                        addUpdatedDataToState();
                        history.push("/hrms/staffAppraisalReview");
                      }}
                    >
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="form-group col-lg-12 col-md-12 col-sm-12"
                style={{ marginTop: "50px" }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                    <button
                      disabled={
                        errorValues.includes(true) |
                        // (KPIs.length !== allValues.length) |
                        !secondLevelSupervisor
                      }
                      className="btn btn-block btn-suntrust font-weight-700"
                      onClick={() => {
                        addKPIsToState();
                      }}
                    >
                      PREVIEW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* /Page Header */}
        </div>
      </div>
      {/* /Page Content */}
      {/* /Page Wrapper */}
    </div>
  );
};
export default StaffAppraisal;
