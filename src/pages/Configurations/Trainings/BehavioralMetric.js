import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { addBehavioralMetric } from "../../../services/PerformanceManagement/Configurations/behavioralMetric/addBehavioralMetric";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import InputField from "../../../components/InputField";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { deleteBehaviorMetric } from "../../../services/PerformanceManagement/Configurations/behavioralMetric/deleteBehaviourMetric";

export default function BehavioralMetric() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [behaviorId, setBehaviorId] = useState("");

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const { data: behaviorMetrics } = useSelector(
    (state) => state.performanceManagement.getBehavioralMetricsReducer
  );

  const behaviorMetricColumn = [
    {
      title: "BEHAVIORAL TRAINING TYPE",
      dataIndex: "description",
    },
    {
      title: "",
      render: (text, record) => (
        <Link
          to="#"
          data-toggle="modal"
          data-target="#delete_category"
          className="btn btn-sm btn-outline-danger m-r-10"
          onClick={() => {
            setBehaviorId(text.id);
            toggleModal();
          }}
        >
          <i className="fa fa-trash" />
        </Link>
      ),
    },
  ];

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

  const behaviorHandler = (data) => {
    const newData = {
      data,
      reset,
      dispatch,
    };
    dispatch(addBehavioralMetric(newData));
  };
  return (
    <div className="tab-pane show active" id="behaviour_training">
      <form onSubmit={handleSubmit(behaviorHandler)}>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-4">
            <div className="form-group">
              <InputField
                register={register}
                name="metric"
                label="Enter Behavioural Training"
                className="m-b-10"
                required
                type="text"
                errors={errors?.metric}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-6 col-sm-12 m-b-10">
            <button
              type="submit"
              className="btn btn-block btn-suntrust font-weight-700"
            >
              ADD
            </button>
          </div>
        </div>
      </form>

      <div className="row m-t-50 m-b-20">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              pagination={{
                total: behaviorMetrics.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              style={{ overflowX: "auto" }}
              columns={behaviorMetricColumn}
              // bordered
              dataSource={behaviorMetrics}
              rowKey={(record) => record.id}
              onChange={console.log("change")}
            />
          </div>
        </div>
      </div>
      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-90w  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Request</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-block btn-outline-danger"
                      onClick={() => {
                        dispatch(
                          deleteBehaviorMetric({ behaviorId, dispatch })
                        );
                        toggleModal();
                      }}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      onClick={() => toggleModal()}
                      className="btn btn-block btn-primary"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
