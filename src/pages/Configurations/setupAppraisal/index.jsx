/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Table } from "antd";
import "antd/dist/antd.css";
import "../../../assets/css/antdstyle.css";
import { useForm } from "react-hook-form";
import InputField from "../../../components/InputField";
import { addSelect, timeDuration } from "../../../utils/helper";
import { classNames } from "../../../utils/classNames";
import { useSelector, useDispatch } from "react-redux";
import { setupAppraisal } from '../../../services/PerformanceManagement/Configurations/appraisalSetup/setUpAppraisal';
import Loader from '../../../components/Loader/index';

const SetupAppraisal = () => {
  const [appraisalPeriod, setAppraisalPeriod] = useState("");
  const dispatch = useDispatch();

  const { loading: setupLoading } = useSelector(
    (state) => state.performanceManagement.setupAppraisalReducer
  );

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  let today = new Date().toISOString().slice(0, 10);

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

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  console.log("watchDate", watch("endDate"));

  const setupAppraisalHandler = (data) => {
    const { status, startDate, endDate, startTime, endTime } = data;
    const newData = {
      status,
      startDate: startDate ? startDate : "",
      endDate: endDate ? endDate : "",
      startTime: startTime ? startTime : "00:00:00.0000000",
      endTime: endTime ? endTime : "00:00:00.0000000",
      reset,
    };
    console.log(newData);

    dispatch(setupAppraisal(newData));
  };

  const checkPeriod = (e) => {
    setAppraisalPeriod(e.target.value);
  };

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
          <h3 className="user-name m-b-10">Appraisal</h3>
        </div>
        {/* /Page Header */}

        <form
          className="card m-b-50 col-lg-12"
          onSubmit={handleSubmit(setupAppraisalHandler)}
        >
          <div className="card-body">
            <div className="row flex-column">
              <div className="col-lg-12 m-t-10 m-b-20">
                <h4 className="user-name m-t-0">Setup Appraisal</h4>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Status</div>
                <div className="form-group">
                  <select
                    {...register("status", { required: true })}
                    className={classNames(
                      errors?.status ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    <option value="">Select Option</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Appraisal Period</div>
                <div className="form-group">
                  <select
                    // defaultValue="Monthly"
                    {...register("appraisalPeriod", { required: true })}
                    className={classNames(
                      errors?.appraisalPeriod ? "error-class" : "",
                      "form-control"
                    )}
                    onChange={(e) => checkPeriod(e)}
                  >
                    {timeDuration.map((duration, index) => {
                      return (
                        <option value={duration.value} key={index}>
                          {" "}
                          {duration.duration}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {appraisalPeriod === "hourly" && (
                <div>
                  <InputField
                    register={register}
                    name="startTime"
                    label="Start Time"
                    className="col-lg-4 m-b-30"
                    required
                    type="time"
                    errors={errors?.startTime}
                  />

                  <InputField
                    register={register}
                    name="endTime"
                    label="End Time"
                    className="col-lg-4 m-b-30"
                    required
                    // defaultValue={}
                    type="time"
                    errors={errors?.endTime}
                  />
                </div>
              )}

              {appraisalPeriod !== "hourly" && (
                <div>
                  <InputField
                    register={register}
                    name="startDate"
                    label="Start Date"
                    defaultValue={today}
                    className="col-lg-4 m-b-30"
                    required
                    type="date"
                    errors={errors.startDate}
                    message={
                      watchStartDate < today
                        ? "Start date shouldn't be lesser than current date"
                        : ""
                    }
                  />

                  <InputField
                    register={register}
                    name="endDate"
                    label="End Date"
                    className="col-lg-4 m-b-30"
                    defaultValue={today}
                    required
                    type="date"
                    errors={errors.endDate}
                    message={
                      watchStartDate > watchEndDate
                        ? "Start date shouldn't be greater than end date"
                        : ""
                    }
                  />
                </div>
              )}

              <div className="col-lg-3 m-b-10">
                <div className="form-group">
                  <button
                    disabled={
                      watchStartDate > watchEndDate || watchStartDate < today
                    }
                    type="submit"
                    href=""
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    {setupLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* /Page Content */}
    </div>
  );
};
export default SetupAppraisal;
