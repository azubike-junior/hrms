/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../components/pagination";
import "../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getJobFunctions } from '../../services/PerformanceManagement/Configurations/getJobFunctions/index';
import { getAllDepartments } from '../../services/PerformanceManagement/hrReports/getAllDepartments';
import { getAllStaffs } from '../../services/PerformanceManagement/Configurations/staffs/getAllStaffs';
import { classNames } from '../../utils/classNames';
import { updateProfile } from '../../services/PerformanceManagement/profile/updateProfile';
import InputField from './../../components/InputField/index';

const SetupProfile = () => {
  const [jobFuncs, setJobFuncs] = useState([]);
  const [secondLevelSupervisor, setSecondLevelSupervisor] = useState("");
  const [supervisorName, setSupervisorName] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const imageUrl = JSON.parse(localStorage.getItem("photoPath"));

  const { data: departments } = useSelector(
    (state) => state.performanceManagement.getAllDepartmentsReducer
  );

  const { data: allStaffs } = useSelector((state) => state.getAllStaffsReducer);

  const { data: jobFunctions } = useSelector(
    (state) => state.performanceManagement.getJobFunctionsReducer
  );

  const handleDepartment = (e) => {
    const allJobFunctions = jobFunctions?.filter(
      (job) => job.departmentId === Number(e.target.value.split("+")[1])
    );
    setJobFuncs(allJobFunctions);
  };

  let allDepartments;

  if (departments) {
    allDepartments = [
      { departmentId: "", description: "-Select-" },
      ...departments,
    ];
  }

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  const submitHandler = (data) => {
    const {
      secondLevelSupervisor,
      dateHired,
      lastPromotionDate,
      jobId,
      departmentId,
      supervisorName,
      email,
      staffId,
      firstName,
      lastName,
    } = data;
    // console.log(">>>secondLevel", secondLevelSupervisor, supervisorName);
    const allData = {
      staffId,
      firstName,
      lastName,
      department: departmentId.split("+")[0],
      jobFunctionId: jobId,
      email,
      supervisorId: supervisorName.split("+")[1],
      supervisorName: supervisorName.split("+")[0],
      secondLevelSupervisorId: secondLevelSupervisor.split("+")[1],
      secondLevelSupervisorName: secondLevelSupervisor.split("+")[0],
      dateHired,
      lastPromotionDate: lastPromotionDate ? lastPromotionDate : null,
    };

    const payload = { allData, history };

    dispatch(updateProfile(payload));
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

  useEffect(() => {
    dispatch(getJobFunctions());
  }, []);

  useEffect(() => {
    dispatch(getAllDepartments());
  }, []);

  useEffect(() => {
    dispatch(getAllStaffs());
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
        <div className="">
          <h3 className="user-name m-b-10">Profile</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <form className="card-body" onSubmit={handleSubmit(submitHandler)}>
            <div className="row">
              <div className="col-lg-12 m-t-10 m-b-20">
                <h4 className="user-name m-t-0">Setup Profile</h4>
              </div>

              {/* <div className="col-lg-12 m-t-10 m-b-20">
                <div className="w-50">
                  <img src={imageUrl} className="profileImage" />
                </div>
              </div> */}

              <InputField
                register={register}
                name="firstName"
                label="First Name"
                className="col-lg-4 m-b-10"
                required
                type="text"
                errors={errors?.firstName}
              />

              <InputField
                register={register}
                name="lastName"
                label="Last Name"
                className="col-lg-4 m-b-10"
                required
                type="text"
                errors={errors?.lastName}
              />

              <InputField
                register={register}
                name="staffId"
                label="Staff ID"
                className="col-lg-4 m-b-10"
                required
                type="text"
                errors={errors?.staffId}
              />

              <InputField
                register={register}
                name="email"
                label="Email"
                className="col-lg-4 m-b-10"
                required
                type="text"
                errors={errors?.email}
              />

              <div className="col-lg-4 m-b-10">
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
                          value={`${department?.description} + ${department.departmentId}`}
                        >
                          {department?.description}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Job Function</div>
                <div className="form-group">
                  <select
                    {...register("jobId", { required: true })}
                    className={classNames(
                      errors?.jobId ? "error-class" : "",
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

              <div className="col-lg-4 ">
                <div className=" m-b-10">Supervisor Name</div>

                <div className="form-group ">
                  <select
                    {...register("supervisorName", { required: true })}
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className={classNames(
                      errors?.supervisorName ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    <option value="">-Select-</option>
                    {allStaffs?.map((staff) => {
                      return (
                        <option value={`${staff.staffName} + ${staff.staffId}`}>
                          {staff.staffName}
                        </option>
                      );
                    })}
                    <option value="N/A">Not Available</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className=" m-b-10">Second Line Supervisor</div>

                <div className="form-group ">
                  <select
                    {...register("secondLevelSupervisor", { required: true })}
                    value={secondLevelSupervisor}
                    onChange={(e) => setSecondLevelSupervisor(e.target.value)}
                    className={classNames(
                      errors?.secondLevelSupervisor ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    <option value="">-Select-</option>
                    {allStaffs?.map((staff) => {
                      return (
                        <option value={`${staff.staffName} + ${staff.staffId}`}>
                          {staff.staffName}
                        </option>
                      );
                    })}
                    <option value="N/A">Not Available</option>
                  </select>
                </div>
              </div>

              <InputField
                register={register}
                name="dateHired"
                label="Date Hired"
                className="col-lg-4 m-b-10"
                required
                type="date"
                errors={errors.dateHired}
              />

              <InputField
                register={register}
                name="lastPromotionDate"
                label="Last Promotion Date"
                className="col-lg-4 m-b-10"
                type="date"
                errors={errors.lastPromotionDate}
              />
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10 d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-block btn-suntrust font-weight-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};
export default SetupProfile;
