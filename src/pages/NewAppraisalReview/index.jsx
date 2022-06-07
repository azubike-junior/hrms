import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useStateMachine } from "little-state-machine";
import { submitStaffAppraisal } from "../../services/PerformanceManagement/StaffAppraisal/submitStaffAppraisal";
import { NewKpiReviewComponent } from "../../components/KpiComponent";
import { emptyStateData, updateName } from "../../utils/helper";
import { getIndividualKpis } from "../../services/PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import { getCategoryTypes } from "../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import Modal from "react-bootstrap/Modal";
import Loader from "./../../components/Loader/index";
import Swal from "sweetalert2";
import { getKpiByJobFunction } from "../../services/PerformanceManagement/Configurations/individualKpi/getKpibyJobFunction";

const StaffAppraisalReview = () => {
  const { state: allData, actions } = useStateMachine({ updateName });
  const dispatch = useDispatch();
  const [kpiResult, setKpiResult] = useState("");
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  const jobFunctionId = JSON.parse(localStorage.getItem("jobFunctionId"));

  const { data: jobKpis } = useSelector(
    (state) => state.performanceManagement.getKpiByJobFunctionReducer
  );

  const { data: KPIs } = useSelector(
    (state) => state.performanceManagement.getIndividualKpisReducer
  );

  const { data: categories } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  const { loading: submitLoading, error: submitAppraisalError } = useSelector(
    (state) => state.performanceManagement.submitStaffAppraisalReducer
  );

  let results = [];

  for (let category = 0; category < categories.length; category++) {
    results.push(
      jobKpis.filter((kpi) => kpi.category == categories[category].description)
    );
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getIndividualKpis());
  }, []);

  useEffect(() => {
    dispatch(getKpiByJobFunction(jobFunctionId));
  }, []);

  useEffect(() => {
    dispatch(getCategoryTypes());
  }, []);

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  // console.log(">>>>>>staffData", staffData);

  const {
    appraiseeTimeManagementScore,
    appraiseePunctualityScore,
    appraiseeCommunicationScore,
    appraiseeProfessionalConductScore,
    appraiseeAnalyticalThinkingScore,
    appraiseeBehaviouralTrainings,
    appraiseeFunctionalTrainings,
    appraiseeBehaviourArray,
    appraiseeFunctionalArray,
    strengthResult,
  } = allData.data;

  // console.log(">>>>>> brhaviouralTrain from review", appraiseeBehaviouralTrainings)

  const emptyState = () => {
    actions.updateName(emptyStateData);
  };

  const submitAppraisal = () => {
    const appraise = jobKpis?.map((kpi) => {
      return {
        supervisorRate: "",
        key: 0,
        supervisorResult: "",
        kpiId: Number(kpi.id),
        categoryId: Number(kpi.categoryId),
        appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
        appraiseeRate: allData.data.values[kpi.id],
      };
    });

    const {
      staffId,
      supervisorId,
      supervisorName,
      firstName,
      lastName,
      secondLevelSupervisorName,
      secondLevelSupervisorId,
      departmentCode,
      dateOfBirth,
      jobDescription,
      grade,
      branchName,
      department,
      departmentName,
      gradeName,
      lastPromotionDate
    } = staffData;

    // console.log(">>>>staffID", staffId, superVisorFistName)

    const appraisals = {
      staffId,
      secondLevelSupervisorId,
      supervisorId,
      supervisorName,
      appraiseeName: `${firstName} ${lastName}`,
      exceptionalAchievement: allData.data.exceptionalAchievement,
      secondSupervisorName: secondLevelSupervisorName,
      appraiseeComment: "",
      departmentCode: department,
      totalAppraiseeResult: kpiResult,
      gradeName,
      jobDescription,
      branchName,
      department: departmentName,
      dateOfBirth: dateOfBirth ? dateOfBirth : "0001-01-01",
      appraiseeTimeManagementScore,
      appraiseePunctualityScore,
      appraiseeCommunicationScore,
      appraiseeProfessionalConductScore,
      appraiseeAnalyticalThinkingScore,
      appraiseeBehaviouralTrainings,
      appraiseeFunctionalTrainings,
      lastPromotionDate: lastPromotionDate ? lastPromotionDate : "0001-01-01",
      kpis: appraise,
    };

    const data = {
      appraisals,
      history,
      toggleModal,
      emptyState,
    };
    console.log(">>>>>>appraisals", appraisals);
    dispatch(submitStaffAppraisal(data));
  };

  const resultValues = Object.values(allData.data.appraiseeResults);

  const result = resultValues
    ?.reduce((acc, num) => {
      return Number(acc) + Number(num);
    }, 0)
    .toFixed();

  useEffect(() => {
    setKpiResult(result);
  });

  // useEffect(() => {
  //   {
  //     submitAppraisalError?.responseCode === "96" &&
  //       Swal.fire(`Sorry, an Error ocurred`, "Error!", "error").then(() => {
  //         // reset();
  //       });
  //   }
  // }, []);

  const processPerspective = results[0]?.map((kpi, index) => {
    if (index === 0) {
      return {
        ...kpi,
        category: kpi.category,
        appraiseeRate: allData.data.appraiseeRates[kpi.id],
        appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
      };
    }
    return {
      ...kpi,
      category: "",
      appraiseeRate: allData.data.appraiseeRates[kpi.id],
      appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
    };
  });

  const customerPerspective = results[1]?.map((kpi, index) => {
    if (index === 0) {
      return {
        ...kpi,
        category: kpi.category,
        appraiseeRate: allData.data.appraiseeRates[kpi.id],
        appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
      };
    }
    return {
      ...kpi,
      category: "",
      appraiseeRate: allData.data.appraiseeRates[kpi.id],
      appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
    };
  });

  const financialPerspective = results[2]?.map((kpi, index) => {
    if (index === 0) {
      return {
        ...kpi,
        category: kpi.category,
        appraiseeRate: allData.data.appraiseeRates[kpi.id],
        appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
      };
    }
    return {
      ...kpi,
      category: "",
      appraiseeRate: allData.data.appraiseeRates[kpi.id],
      appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
    };
  });

  const capacityPerspective = results[3]?.map((kpi, index) => {
    if (index === 0) {
      return {
        ...kpi,
        category: kpi.category,
        appraiseeRate: allData.data.appraiseeRates[kpi.id],
        appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
      };
    }
    return {
      ...kpi,
      category: "",
      appraiseeRate: allData.data.appraiseeRates[kpi.id],
      appraiseeResult: allData?.data?.appraiseeResults[kpi.id]?.toFixed(),
    };
  });

  // console.log(">>>>>>>>.state.data from review", allData);
  // console.log(">>>>>submitError", submitAppraisalError?.responseCode);

  return (
    <div>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>| Appraisal Review</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}

        <div className="m-t-50 container-fluid">
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

                  <div className="row mb-5">
                    {/* Table Header  Starts Here */}
                    <div
                      className="col-lg-12 d-flex border-bottom pt-2 pb-2 font-weight-bolder"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div className="col-lg-2">PERSPECTIVE</div>
                      <div className="col-lg-3">KPI</div>
                      <div className="col-lg-1 text-center">TARGET</div>
                      <div className="col-lg-2 text-center">WEIGHT</div>
                      <div className="col-lg-2 text-center">APP. RATING</div>
                      <div className="col-lg-2 text-center">APP. SCORE</div>
                    </div>
                    {/* Table Header Ends Here */}

                    {financialPerspective?.map((kpi) => {
                      return <NewKpiReviewComponent kpi={kpi} />;
                    })}

                    {customerPerspective?.map((kpi) => {
                      return <NewKpiReviewComponent kpi={kpi} />;
                    })}

                    {processPerspective?.map((kpi) => {
                      return <NewKpiReviewComponent kpi={kpi} />;
                    })}

                    {capacityPerspective?.map((kpi) => {
                      return <NewKpiReviewComponent kpi={kpi} />;
                    })}

                    {/* Financial Review Starts Here */}
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
                          color: "#DAA520",
                          fontSize: "18px",
                          fontWeight: "bolder",
                        }}
                      >
                        {" "}
                        {Number(kpiResult)?.toFixed()}
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-12 border-bottom mt-3pt-5 pb-2 font-weight-bolder"
                    style={{
                      fontWeight: "bolder",
                      marginBottom: "10px",
                      backgroundColor: "#cccccc",
                    }}
                  >
                    <div className="col-lg-12 pt-2 user-name">STRENGTHS</div>
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
                              <h4 className="col-lg-8">Rating</h4>
                            </div>
                          </div>

                          <div className="d-flex mt-3 mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Time Management</div>
                              <div className="col-lg-8">
                                {appraiseeTimeManagementScore}/5
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mt-3 mb-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Punctuality</div>
                              <div className="col-lg-4">
                                {appraiseePunctualityScore}/5
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mt-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Professional Conduct
                              </div>

                              <div className="col-lg-8">
                                {appraiseeProfessionalConductScore}/5
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">Communication</div>

                              <div className="col-lg-8">
                                {appraiseeCommunicationScore}/5
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3 border-bottom">
                            <div className="col-lg-12 d-flex">
                              <div className="col-lg-4">
                                Analytical Thinking
                              </div>

                              <div className="col-lg-8">
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

                            <div className="col-lg-8">{strengthResult}/25</div>
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
                            {appraiseeBehaviourArray.length === 0 ? (
                              <p>No behavioral training was selected</p>
                            ) : (
                              <div className="panel-body">
                                <div className="m-3">
                                  <div className="form-group">
                                    <label>
                                      Suggest a Behavioural Training:
                                    </label>
                                    {appraiseeBehaviourArray?.map(
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
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="panel panel-default">
                            <div className="panel-heading text-center font-weight-bold">
                              FUNCTIONAL TRAINING
                            </div>
                            {appraiseeFunctionalArray.length === 0 ? (
                              <p>No functional training selected</p>
                            ) : (
                              <div className="panel-body">
                                <div className="m-3">
                                  <div className="form-group">
                                    <label>
                                      Suggest a Functional Training:
                                    </label>
                                    {appraiseeFunctionalArray?.map(
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-lg-12"
                    style={{ marginTop: "50px", marginBottom: "20px" }}
                  >
                    <div className="form-group mb-5">
                      <div
                        className="mb-3 font-weight-bold"
                        style={{
                          marginBottom: "30px",
                          textDecoration: "underline",
                        }}
                      >
                        ACHIEVEMENT(S)
                      </div>
                      {allData?.data?.exceptionalAchievement}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="form-group col-lg-12 col-md-12 col-sm-12"
              style={{ marginTop: "50px" }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                  <Link
                    to="/hrms/staffAppraisal"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    Back
                  </Link>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                  <button
                    className="btn btn-block btn-suntrust font-weight-700"
                    onClick={() => toggleModal()}
                  >
                    {submitLoading ? <Loader /> : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Header */}
        </div>
      </div>

      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-90w  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Appraisal Rating</h3>
                <p>Are you sure you want to proceed</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
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
export default StaffAppraisalReview;
