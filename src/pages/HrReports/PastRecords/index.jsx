import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../services/PerformanceManagement/hrReports/getAllDepartments";
import {
  allStatus,
  performanceManagementAppraisalUrl,
} from "../../../utils/helper";
import { getAllAppraisalPeriods } from "../../../services/PerformanceManagement/hrReports/getAppraisalPeriods";
import { getAllAppraisals } from "../../../services/PerformanceManagement/hrReports/getAllAppraisals";
import { classNames } from "../../../utils/classNames";
import { getGrades } from "../../../services/PerformanceManagement/hrReports/getGrades";
import { useForm } from "react-hook-form";
import { getAppraisalsByDate } from "../../../services/PerformanceManagement/hrReports/getAppraisalByDate";
import Loader from "../../../components/Loader/index";

const PastRecords = () => {
  const [selectedFiltered, setSelectedFiltered] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [appraisalReference, setAppraisalReference] = useState("");
  const [startDate, setStartDate] = useState("");

  const { data: appraisals } = useSelector(
    (state) => state.performanceManagement.getAllAppraisalsReducer
  );

  const { data: appraisalsByDate } = useSelector(
    (state) => state.performanceManagement.getAppraisalsByDateReducer
  );
  const [allAppraisals, setAllAppraisals] = useState([]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // console.log("==============date Appraisals===================");
  // console.log(appraisalsByDate);
  // console.log("====================================");

  const handleSelectChange = (e) => {
    if (e.target.value === "Department") {
      dispatch(getAllDepartments());
      return setSelectedFiltered(e.target.value);
    }
    if (e.target.value === "Level") {
      dispatch(getGrades());
      return setSelectedFiltered(e.target.value);
    }
    setSelectedFiltered(e.target.value);
  };

  const handleSelectedOption = (e, option) => {
    // console.log("status", e.target.value);
    let tempAppraisals = [...appraisalsByDate];

    if (option === "period") {
      setSelectedOption(e.target.value);
      const data = { startDate, endDate: e.target.value, setAllAppraisals };
      dispatch(getAppraisalsByDate(data));
      const allReferences = tempAppraisals?.map(
        (appraisal) => appraisal.appraisalReference
      );
      const allRef = allReferences.toString();

      setAppraisalReference(allRef);
    }

    if (option === "department") {
      setSelectedOption(e.target.value);
      tempAppraisals = tempAppraisals?.filter(
        (appraisal) =>
          Number(appraisal.departmentCode) === Number(e.target.value)
      );
      const allReferences = tempAppraisals?.map(
        (appraisal) => appraisal.appraisalReference
      );
      const allRef = allReferences.toString();

      setAppraisalReference(allRef);
    }
    if (option === "status") {
      setSelectedOption(e.target.value);
      tempAppraisals = tempAppraisals?.filter(
        (appraisal) => appraisal.status === e.target.value
      );
      const allReferences = tempAppraisals?.map(
        (appraisal) => appraisal.appraisalReference
      );
      const allRef = allReferences.toString();

      setAppraisalReference(allRef);
    }
    if (option === "level") {
      setSelectedOption(e.target.value);
      tempAppraisals = tempAppraisals?.filter(
        (appraisal) => appraisal.gradeName === e.target.value
      );
      const allReferences = tempAppraisals?.map(
        (appraisal) => appraisal.appraisalReference
      );
      const allRef = allReferences.toString();

      setAppraisalReference(allRef);
    }

    if (option === "search") {
      // console.log(">>>>e", e.target.value);,
      tempAppraisals = [...allAppraisals];

      console.log(">>>>> e", e.target.value);
      // const tempData = tempAppraisals.filter((appraisal) =>
      //   Object.values(appraisal).indexOf(e.target.value) > -1)
      const value = e.target.value;

      if (typeof value === "number") {
        console.log("hello man its number");
        tempAppraisals = tempAppraisals.filter(
          (appraisal) => appraisal.staffId.indexOf(value) > -1
        );
      }
      tempAppraisals = tempAppraisals.filter(
        (appraisal) => appraisal.appraiseeName.toLowerCase().indexOf(value) > -1
      );

      if (value === "") {
        tempAppraisals = appraisals;
      }

      // if (typeof e.target.value === "number") {
      //   tempAppraisals = tempAppraisals?.filter((appraisal) =>
      //     appraisal.staffId.startsWith(e.target.value)
      //   );
      // }

      // const tempAp = tempData.filter((data) => );

      // tempAppraisals = tempAppraisals?.filter((appraisal) =>
      //   appraisal.appraiseeName.toLowerCase().trim().startsWith(e.target.value)
      // );

      console.log(">>>>tempData", tempAppraisals);
    }

    return setAllAppraisals(tempAppraisals);
  };

  // const getAllAppraisalReference = () => {
  //   const allReferences = allAppraisals.map(
  //     (appraisal) => appraisal.appraisalReference
  //   );
  //   const allRef = allReferences.toString();

  // };

  // console.log(">>>>>allRef", appraisalReference);

  const { data: departments } = useSelector(
    (state) => state.performanceManagement.getAllDepartmentsReducer
  );

  const { data: levels } = useSelector(
    (state) => state.performanceManagement.getGradesReducer
  );

  const { data: appraisalPeriods, loading: appraisalsLoading } = useSelector(
    (state) => state.performanceManagement.getAllAppraisalPeriodsReducer
  );

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  // Table displayed on Expense Page
  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
    },
    {
      title: "Staff Name",
      dataIndex: "appraiseeName",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Date Submitted",
      dataIndex: "dateSubmitted",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Appraisal Status",
      dataIndex: "status",
      render: (text, record) => (
        <div
          className="btn btn-white btn-sm btn-rounded action-label"
          aria-expanded="false"
        >
          <i
            className={classNames(
              "",
              text === "COMPLETE" && "text-success",
              text === "SUBMITTED" && "text-danger",
              text === "PRE-PROCESSING" && "text-warning",
              text === "PROCESSING" && "text-purple",
              text === "INPROGRESS" && "text-primary"
            )}
          >
            <i className="fa fa-dot-circle-o mr-2" />
          </i>
          {text}
        </div>
      ),
    },
    {
      title: "Supervisor Score",
      dataIndex: "totalSupervisorResult",
    },
    // {
    //   title: "",
    //   render: (text, record) => (
    //     <Link
    //       onClick={() => console.log("text", text)}
    //       to={`/performanceManagement/preProcessAppraisal/${text.appraisalReference}`}
    //       className="btn btn-sm btn-outline-primary m-r-10"
    //     >
    //       <i className="fa fa-eye m-r-5" />
    //       VIEW
    //     </Link>
    //   ),
    // },
  ];

  useEffect(() => {
    dispatch(getAllAppraisalPeriods());
  }, []);

  useEffect(() => {
    dispatch(getAllAppraisals(setAllAppraisals));
  }, []);

  // useEffect(() => {
  //   dispatch(getGrades());
  // }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>History</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}

      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">HR Past Records</h3>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        {/* Filter Options */}

        <div className="row d-flex">
          <div className="float-left d-flex col-lg-9">
            <div className="dropdown m-r-20">
              <div className="form-group">
                <label className="col-form-label">Start Date</label>
                <input
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  className="col-lg-12 m-b-30 form-control"
                  type="date"
                />
              </div>
            </div>
            <div className="dropdown">
              <div className="form-group">
                <label className="col-form-label">End Date</label>
                <input
                  onChange={(e) => handleSelectedOption(e, "period")}
                  className="col-lg-12 m-b-30 form-control"
                  type="date"
                />
              </div>
            </div>
            <div className="dropdown m-r-20 col-lg-3">
              <div className="form-group">
                <label className="col-form-label">Filter</label>
                <select
                  className="form-control"
                  value={selectedFiltered}
                  onChange={(e) => handleSelectChange(e)}
                >
                  <option value="" selected>
                    Filter By
                  </option>
                  <option
                    value="Department"
                    onClick={() => dispatch(getAllDepartments())}
                  >
                    Departments
                  </option>
                  <option value="Status">Status</option>
                  <option value="Level">Level</option>
                </select>
              </div>
            </div>
            {selectedFiltered === "Department" && (
              <div className="dropdown col-lg-3">
                <div className="form-group">
                  <label className="col-form-label">Category</label>
                  <select
                    value={selectedOption}
                    onChange={(e) => handleSelectedOption(e, "department")}
                    className="form-control"
                  >
                    <option value="">Select {selectedFiltered}</option>
                    {departments?.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>
                          {department.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
            {selectedFiltered === "Status" && (
              <div className="dropdown col-lg-4">
                <div className="form-group">
                  <label className="col-form-label">Category</label>

                  <select
                    value={selectedOption}
                    onChange={(e) => handleSelectedOption(e, "status")}
                    className="form-control"
                  >
                    <option value="">Select {selectedFiltered}</option>
                    {allStatus?.map((status) => {
                      return (
                        <option key={status.value} value={status.value}>
                          {status.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            {selectedFiltered === "Level" && (
              <div className="dropdown col-lg-4">
                <div className="form-group">
                  <label className="col-form-label">Category</label>

                  <select
                    value={selectedOption}
                    onChange={(e) => handleSelectedOption(e, "level")}
                    className="form-control"
                  >
                    <option value="">Select {selectedFiltered}</option>
                    {levels?.map((level) => {
                      return (
                        <option key={level.id} value={level.gradeName}>
                          {level.gradeName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="float-right d-flex col-lg-3">
            <div className="dropdown m-r-50">
              <div className="form-group"></div>
            </div>

            <div className="dropdown m-l-125 m-t-40">
              <a
                className="btn btn-primary"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.open(
                    `${performanceManagementAppraisalUrl}/DownloadReportByAppraisalReference?appraisalReference=${
                      appraisalReference ? appraisalReference : ""
                    }`,
                    "_blank"
                  );
                }}
              >
                Download
              </a>
            </div>
          </div>
        </div>

        {/* Filter Options */}

        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-lg-10 col-sm-10 col-md-10">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={(e) => handleSelectedOption(e, "search")}
              />
              <label className="focus-label">
                Search for a Staff by staff Name or Staff ID (e.g. Abiola)
              </label>
            </div>
          </div>
        </div>
        {/* Search Filter */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: allAppraisals?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                loading={{ indicator: <Loader />, spinning: appraisalsLoading }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={allAppraisals ? allAppraisals : appraisals}
                rowKey={(record) => record.id}
                onChange={console.log("change")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* /Page Content */}
    </div>
  );
};

export default PastRecords;
