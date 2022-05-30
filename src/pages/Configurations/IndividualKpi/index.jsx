/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addIndividualKpi } from "../../../services/PerformanceManagement/Configurations/individualKpi/addIndividualKpi";
import { getIndividualKpis } from "../../../services/PerformanceManagement/Configurations/individualKpi/getIndividualKpi";
import { useSelector } from "react-redux";
import { deleteKpi } from "../../../services/PerformanceManagement/Configurations/individualKpi/deleteKpi";
import { getOrganizationalGoalsByCategory } from "../../../services/PerformanceManagement/Configurations/organizationalGoal/getOrganizationGoalByCategory";
import { getTeamGoalsByOrganizationId } from "../../../services/PerformanceManagement/Configurations/teamGoal/getTeamGoalsByOrganizationalId";
import { getJobFunctions } from "../../../services/PerformanceManagement/Configurations/getJobFunctions";
import { getAllDepartments } from "../../../services/PerformanceManagement/hrReports/getAllDepartments";
import { classNames } from "../../../utils/classNames";
import InputField from "../../../components/InputField";
import {
  useGetCategoriesQuery,
  useGetRateTypeMetricsQuery,
  useGetTargetSourcesQuery,
} from "../../../services/PerformanceManagement/Configurations/getPerformanceConfigs";
import { getCategoryTypes } from "./../../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import { getRateTypeMetric } from "./../../../services/PerformanceManagement/Configurations/getRateTypeMetric/index";
import { getTargetSource } from "./../../../services/PerformanceManagement/Configurations/getTargetSources/index";
import { rateTypes, targetSources } from "../../../utils/helper";

const IndividualKPI = () => {
  const dispatch = useDispatch();
  // const { data: categories } = useGetCategoriesQuery("");
  // const { data: targetSources } = useGetTargetSourcesQuery();
  // const { data: rateTypes } = useGetRateTypeMetricsQuery();
  // const categories = []

  // const targetSources = [];
  // const rateTypes = [];
  const [allKPIs, setAllKPIs] = useState([]);
  const [jobFuncs, setJobFuncs] = useState([]);
  const [kpiId, setKpiId] = useState("");

  const { data: categories } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  // const { data: targetSources } = useSelector(
  //   (state) => state.performanceManagement.getTargetSourceReducer
  // );

  // const { data: rateTypes } = useSelector(
  //   (state) => state.performanceManagement.getRateTypeMetricReducer
  // );

  const { data: teamGoals } = useSelector(
    (state) => state.performanceManagement.getTeamGoalsByOrganizationIdReducer
  );

  const { data: KPIs } = useSelector(
    (state) => state.performanceManagement.getIndividualKpisReducer
  );

  const { data: departments } = useSelector(
    (state) => state.performanceManagement.getAllDepartmentsReducer
  );

  const { data: jobFunctions } = useSelector(
    (state) => state.performanceManagement.getJobFunctionsReducer
  );

  let allCategories;

  let allDepartments;

  if (departments) {
    allDepartments = [
      { departmentId: "", description: "-Select-" },
      ...departments,
    ];
  }

  if (categories) {
    allCategories = [
      { categoryId: "", description: "-Select-" },
      ...categories,
    ];
  }

  const handleGetOrganizationalGoal = (e) => {
    dispatch(getOrganizationalGoalsByCategory(e.target.value));
  };

  const handleGetTeamGoal = (e) => {
    dispatch(getTeamGoalsByOrganizationId(e.target.value));
  };

  const handleDepartment = (e) => {
    const allJobFunctions = jobFunctions?.filter(
      (job) => job.departmentId === Number(e.target.value)
    );
    setJobFuncs(allJobFunctions);
  };

  const { data: orgGoals } = useSelector(
    (state) =>
      state.performanceManagement.getOrganizationalGoalsByCategoryReducer
  );

  let allOrgGoals;
  let allTargetSources;
  let allRateTypes;
  let allTeamGoals;

  if (teamGoals) {
    allTeamGoals = [{ teamGoalId: "", description: "Select" }, ...teamGoals];
  }

  if (orgGoals) {
    allOrgGoals = [
      { organizationalGoalId: "", description: "Select" },
      ...orgGoals,
    ];
  }

  if (targetSources) {
    allTargetSources = [
      { targetSourceId: "", sourceName: "Select" },
      ...targetSources,
    ];
  }

  if (rateTypes) {
    allRateTypes = [{ rateTypeId: "", rateType: "Select" }, ...rateTypes];
  }

  const setText = (text) => {
    return categories?.find((category) => category.categoryId === Number(text))
      ?.description;
  };

  const setTeamDesc = (text) => {
    return teamGoals?.find((team) => team.teamGoalId === Number(text))
      ?.description;
  };

  const setRateDesc = (text) => {
    return rateTypes?.find((rate) => rate.rateTypeId === Number(text))
      ?.rateType;
  };

  const setTargetDesc = (text) => {
    return targetSources?.find(
      (target) => target.targetSourceId === Number(text)
    )?.sourceName;
  };

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const addKpiHandler = (data) => {
    const { organizationalGoal, departmentId, ...rest } = data;
    console.log(">>>>rest", rest);
    dispatch(addIndividualKpi({ data, reset, dispatch }));
  };

  useEffect(() => {
    dispatch(getIndividualKpis());
  }, []);

  useEffect(() => {
    dispatch(getRateTypeMetric());
  }, []);

  useEffect(() => {
    dispatch(getTargetSource());
  }, []);

  useEffect(() => {
    dispatch(getJobFunctions());
  }, []);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, []);

  useEffect(() => {
    dispatch(getCategoryTypes());
  }, []);

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  // Table displayed on
  const kpi_columns = [
    {
      title: "Category Type",
      dataIndex: "categoryId",
      render: (text, record) => <p>{setText(text)}</p>,
    },

    {
      title: "Individual KPI",
      dataIndex: "description",
    },
    {
      title: "Measurable Target",
      dataIndex: "measurableTarget",
    },
    {
      title: "Rate Type",
      dataIndex: "rateTypeId",
      render: (text, record) => <p>{setRateDesc(text)}</p>,
    },
    {
      title: "Target Source",
      dataIndex: "targetSourceId",
      render: (text, record) => <p>{setTargetDesc(text)}</p>,
    },
    {
      title: "Weight (Must add up to 100)",
      dataIndex: "weightedScore",
    },
    {
      title: "",
      render: (text, record) => (
        <a
          to="#"
          data-toggle="modal"
          data-target="#delete_kpi"
          className="btn btn-sm btn-outline-danger m-r-10"
          onClick={() => {
            // console.log(">>>>>text", text.id);
            setKpiId(text.id);
          }}
        >
          <i className="fa fa-trash" />
        </a>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile - HRMS admin Template</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>

      {/* Page Content */}

      <div className="content container-fluid">
        {/* Page Header */}
        <div className="">
          <h3 className="user-name m-b-10">Individual KPI</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <div className="card-body">
            <form className="row" onSubmit={handleSubmit(addKpiHandler)}>
              <div className="col-lg-12 m-t-10 m-b-20">
                <h4 className="user-name m-t-0">Setup KPI</h4>
              </div>
              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Category</div>
                <div className="form-group">
                  <select
                    {...register("categoryId", { required: true })}
                    className={classNames(
                      errors?.categoryId ? "error-class" : "",
                      "form-control"
                    )}
                    onChange={(e) => handleGetOrganizationalGoal(e)}
                  >
                    {allCategories?.map((category) => {
                      return (
                        <option value={category?.categoryId}>
                          {category?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Organizational Goal</div>
                <div className="form-group">
                  <select
                    {...register("organizationalGoal", { required: true })}
                    className={classNames(
                      errors?.organizationalGoalId ? "error-class" : "",
                      "form-control"
                    )}
                    onChange={(e) => handleGetTeamGoal(e)}
                  >
                    {allOrgGoals?.map((orgGoal) => {
                      return (
                        <option value={orgGoal?.organizationalGoalId}>
                          {orgGoal?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Team Goal</div>
                <div className="form-group">
                  <select
                    {...register("teamGoalId", { required: true })}
                    className={classNames(
                      errors?.teamGoalId ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    {allTeamGoals?.map((teamGoal) => {
                      return (
                        <option
                          key={teamGoal?.teamGoalId}
                          value={teamGoal?.teamGoalId}
                        >
                          {teamGoal?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Department</div>
                <div className="form-group">
                  <select
                    {...register("departmentId", { required: true })}
                    className={classNames(
                      errors?.departmentId ? "error-class" : "",
                      "form-control"
                    )}
                    onChange={(e) => handleDepartment(e)}
                  >
                    {allDepartments?.map((department) => {
                      return (
                        <option
                          key={department?.departmentId}
                          value={department?.departmentId}
                        >
                          {department?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Job Function</div>
                <div className="form-group">
                  <select
                    {...register("jobId", { required: true })}
                    className={classNames(
                      errors?.teamGoalId ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    <option value="">-Select-</option>
                    {jobFuncs?.map((job) => {
                      return (
                        <option key={job?.jobId} value={job?.jobId}>
                          {job?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-12 m-b-10">
                <div className="m-b-10">Individual KPI</div>
                <div className="form-group">
                  <textarea
                    {...register("description", { required: true })}
                    className={classNames(
                      errors?.description ? "error-class" : "",
                      "form-control"
                    )}
                    rows="3"
                  />
                </div>
              </div>

              <div className="col-lg-3 m-b-10">
                <div className="m-b-10">Target Source</div>
                <div className="form-group">
                  <select
                    {...register("targetSourceId", { required: true })}
                    className={classNames(
                      errors?.targetSource ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    {allTargetSources?.map((targetSource) => {
                      return (
                        <option
                          key={targetSource.targetSourceId}
                          value={targetSource.targetSourceId}
                        >
                          {targetSource.sourceName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-3 m-b-10">
                <div className="m-b-10">Rate Type (Metric)</div>
                <div className="form-group">
                  <select
                    {...register("rateTypeId", { required: true })}
                    className={classNames(
                      errors?.rateType ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    {allRateTypes?.map((rateType) => {
                      return (
                        <option
                          key={rateType.rateTypeId}
                          value={rateType.rateTypeId}
                        >
                          {rateType.rateType}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <InputField
                register={register}
                name="measurableTarget"
                label="Measurable Target (Metric)"
                className="col-lg-3 m-b-10"
                required
                type="text"
                errors={errors?.measurableTarget}
              />

              {/* <div className="col-lg-3 m-b-10">
                <div className="m-b-10">Measurable Target (Metric)</div>
                <div className="form-group">
                  <input type="text" className="form-control" />
                </div>
              </div> */}

              {/* <div className="col-lg-3 m-b-10"> */}
              <InputField
                register={register}
                name="weightedScore"
                label="Weight Scores"
                className="col-lg-3 m-b-10"
                required
                type="text"
                errors={errors?.weightedScore}
              />
              {/* </div> */}

              <div className="col-lg-3 col-md-6 col-sm-12 m-t-30 m-b-10">
                <button
                  type="submit"
                  href="#"
                  className="btn btn-block btn-suntrust font-weight-700"
                >
                  ADD
                </button>
              </div>
            </form>

            <div className="row m-t-50 m-b-20">
              {/* <h4 className="user-name m-b-10 col-md-12">CATEGORY LIST</h4> */}

              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: KPIs.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={kpi_columns}
                    // bordered
                    dataSource={KPIs}
                    rowKey={(record) => record.id}
                    onChange={console.log("change")}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20">
              <div className="d-flex align-items-center justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-12 m-b-10">
                  <a
                    href=""
                    className="btn btn-block btn-primary font-weight-700"
                  >
                    SUBMIT
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* Delete Request Modal */}
      <div className="modal custom-modal fade" id="delete_kpi" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete KPI</h3>
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      onClick={() => {
                        const data = { kpiId, dispatch };
                        dispatch(deleteKpi(data));
                      }}
                      data-dismiss="modal"
                      className="btn btn-block btn-primary"
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-dismiss="modal"
                      className="btn btn-block btn-outline-danger"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Request Modal */}
    </div>
  );
};
export default IndividualKPI;
