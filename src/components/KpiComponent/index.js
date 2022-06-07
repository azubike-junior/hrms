import React from "react";
import { useStateMachine } from "little-state-machine";
import { updateName } from "../../utils/helper";

function KpiComponent({ kpi }) {
  return (
    <div className="row m-t-20">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
            <div className="col-lg-4">{kpi.description}</div>
            <div className="col-lg-2 text-center">{kpi.measurableTarget}</div>
            <div className="col-lg-2 text-center">{kpi.weightedScore}</div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.appraiseeRate}
            </div>
            <div
              className="col-lg-2 text-center"
              style={{ color: "red", fontWeight: "bolder" }}
            >
              {kpi.appraiseeResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const KpiInputComponent = ({
  kpi,
  values,
  appraiseeResults,
  updateValues,
}) => {
  return (
    <div className="row m-t-20">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
            <div className="col-lg-4">{kpi.description}</div>
            <div className="col-lg-2 text-center">{kpi.measurableTarget}</div>
            <div className="col-lg-2 text-center"> {kpi.weightedScore}</div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              <input
                type="number"
                value={values?.id}
                min={1}
                max={kpi.measurableTarget}
                className="rate-input"
                onChange={(e) => updateValues(e, kpi.id, kpi)}
              />
            </div>
            <div
              className="col-lg-2 text-center"
              style={{ color: "red", fontWeight: "bolder" }}
            >
              {appraiseeResults[kpi.id]?.toFixed()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupervisorKpiInput = ({
  kpi,
  values,
  appraiseeResults,
  updateValues,
}) => {
  return (
    <div className="row m-t-20">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
            <div className="col-lg-3">{kpi.kpiDescription}</div>
            <div className="col-lg-2 text-center">{kpi.measurableTarget}</div>
            <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.appraiseeRate}
            </div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.appraiseeResult}
            </div>
            <div
              className="col-lg-1 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              <input
                min={1}
                max={kpi.measurableTarget}
                value={values?.id}
                onChange={(e) => updateValues(e, kpi.kpiId, kpi)}
                type="number"
                className="form-control"
              />
            </div>
            <div
              className="col-lg-1 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {appraiseeResults[kpi.kpiId]?.toFixed()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupervisorKpiComponent = ({ kpi }) => {
  return (
    <div className="row m-t-20">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
            <div className="col-lg-3">{kpi.description}</div>
            <div className="col-lg-2 text-center">{kpi.measurableTarget}</div>
            <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.appraiseeRate}
            </div>
            <div
              className="col-lg-2 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.appraiseeResult}
            </div>
            <div
              className="col-lg-1 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.supervisorRate}
            </div>
            <div
              className="col-lg-1 text-center"
              style={{
                color: "#139b23",
                fontWeight: "bolder",
              }}
            >
              {kpi.supervisorResult}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewKpiInputComponent = ({
  kpi,
  values,
  appraiseeResults,
  updateValues,
  errors,
  defaultValue,
  defaultRate,
  ref
}) => {
  const { state, actions } = useStateMachine({ updateName });

  return (
    <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
      <div className="col-lg-2" style={{ fontWeight: "bolder" }}>
        {kpi.category.toUpperCase()}
      </div>
      <div className="col-lg-3">{kpi.description}</div>
      <div className="col-lg-1 text-center">{kpi.measurableTarget}</div>
      <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
      <div className="col-lg-2 text-center">
        <input
          type="number"
          value={values?.id}
          min={1}
          ref={ref}
          defaultValue={defaultValue}
          max={kpi.measurableTarget}
          className={errors[kpi.id] ? "error-input" : "rate-input"}
          onChange={(e) => updateValues(e, kpi.id, kpi)}
        />
      </div>

      <div className="col-lg-2 text-center">
        {errors[kpi.id] ? (
          <p className="error-color">target Exceeded</p>
        ) : appraiseeResults[kpi.id]?.toFixed(1) ? (
          appraiseeResults[kpi.id]?.toFixed(1)
        ) : (
          defaultRate
        )}
      </div>
    </div>
  );
};

export const NewKpiReviewComponent = ({ kpi }) => {
  return (
    <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
      <div className="col-lg-2" style={{ fontWeight: "bolder" }}>
        {kpi.category.toUpperCase()}
      </div>
      <div className="col-lg-3">{kpi.description}</div>
      <div className="col-lg-1 text-center">{kpi.measurableTarget}</div>
      <div className="col-lg-2 text-center">{kpi.weightedScore}</div>
      <div className="col-lg-2 text-center">
        {/* <input type="text" className="form-control" /> */}
        {kpi.appraiseeRate}
      </div>
      <div className="col-lg-2 text-center">{kpi.appraiseeResult}</div>
    </div>
  );
};

export const EditSupervisorKpiInputComponent = ({
  kpi,
  values,
  supervisorResults,
  updateValues,
  errors,
  defaultValue,
  defaultRate,
}) => {
  // console.log(">>>>kpi from comp", kpi, values, errors)
  return (
    <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
      <div className="col-lg-2" style={{ fontWeight: "bolder" }}>
        {kpi.categoryDescription.toUpperCase()}
      </div>
      <div className="col-lg-3">{kpi.kpiDescription}</div>
      <div className="col-lg-1 text-center">{kpi.measurableTarget}</div>
      <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
      <div className="col-lg-1 text-center">{kpi.appraiseeRate}</div>
      <div className="col-lg-2 text-center">{kpi.appraiseeResult}</div>
      <div className="col-lg-1 text-center">
        {/* <input type="text" className="form-control" /> */}
        {/* <input
          min={1}
          max={kpi.measurableTarget}
          value={values?.id}
          onChange={(e) => updateValues(e, kpi.kpiId, kpi)}
          type="number"
          className={errors[kpi.kpiId] ? "error-input2" : "form-control"}
        /> */}
        <input
          type="number"
          value={values?.id}
          min={1}
          defaultValue={defaultValue}
          max={kpi.measurableTarget}
          className={errors[kpi.id] ? "error-input" : "rate-input"}
          onChange={(e) => updateValues(e, kpi.KpiId, kpi)}
        />
      </div>
      {/* <div className="col-lg-1 text-center">
        {errors[kpi.kpiId] ? (
          <p className="error-color">Target Exceeded</p>
        ) : (
          appraiseeResults[kpi.kpiId]?.toFixed()
        )}
      </div> */}

      <div className="col-lg-1 text-center">
        {errors[kpi.kpiId] ? (
          <p className="error-color">target Exceeded</p>
        ) : supervisorResults[kpi.kpiId]?.toFixed() ? (
          supervisorResults[kpi.kpiId]?.toFixed()
        ) : (
          defaultRate
        )}
      </div>
    </div>
  );
};

export const NewSupervisorKpiInputComponent = ({
  kpi,
  values,
  appraiseeResults,
  updateValues,
  errors,
}) => {
  return (
    <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
      <div className="col-lg-2" style={{ fontWeight: "bolder" }}>
        {kpi.categoryDescription.toUpperCase()}
      </div>
      <div className="col-lg-3">{kpi.kpiDescription}</div>
      <div className="col-lg-1 text-center">{kpi.measurableTarget}</div>
      <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
      <div className="col-lg-1 text-center">{kpi.appraiseeRate}</div>
      <div className="col-lg-2 text-center">{kpi.appraiseeResult}</div>
      <div className="col-lg-1 text-center">
        {/* <input type="text" className="form-control" /> */}
        <input
          min={1}
          max={kpi.measurableTarget}
          value={values?.id}
          onChange={(e) => updateValues(e, kpi.kpiId, kpi)}
          type="number"
          className={errors[kpi.kpiId] ? "error-input2" : "form-control review-input"}
        />
      </div>
      <div className="col-lg-1 text-center">
        {errors[kpi.kpiId] ? (
          <p className="error-color">Target Exceeded</p>
        ) : (
          appraiseeResults[kpi.kpiId]?.toFixed(1)
        )}
      </div>
    </div>
  );
};

export const NewSupervisorKpiReviewComponent = ({ kpi }) => {
  return (
    <div className="col-lg-12 d-flex border-bottom pt-2 pb-2">
      <div className="col-lg-2" style={{ fontWeight: "bolder" }}>
        {kpi.categoryDescription.toUpperCase()}
      </div>
      <div className="col-lg-3">{kpi.kpiDescription}</div>
      <div className="col-lg-1 text-center">{kpi.measurableTarget}</div>
      <div className="col-lg-1 text-center">{kpi.weightedScore}</div>
      <div className="col-lg-1 text-center">{kpi.appraiseeRate}</div>
      <div className="col-lg-2 text-center">{kpi.appraiseeResult}</div>
      <div className="col-lg-1 text-center">
        {/* <input type="text" className="form-control" /> */}
        {kpi.supervisorRate}
      </div>
      <div className="col-lg-1 text-center">{kpi.supervisorResult}</div>
    </div>
  );
};

export default KpiComponent;
