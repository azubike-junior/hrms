import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import { addRecommendation } from "../../../services/PerformanceManagement/Configurations/recommendation/addRecommendation";
import InputField from "../../../components/InputField";
import { Link } from "react-router-dom";
import { getRecommendations } from '../../../services/PerformanceManagement/Configurations/recommendation/getRecommendation';
import { deleteRecommendation } from '../../../services/PerformanceManagement/Configurations/recommendation/deleteRecommendation';
import Modal from "react-bootstrap/Modal";

export default function Recommendation() {
  const dispatch = useDispatch();
   const [openModal, setOpenModal] = useState(false);
   const [recommendationId, setRecommendationId] = useState("");

   const toggleModal = () => {
     setOpenModal(!openModal);
   };

  const { data: recommendations } = useSelector(
    (state) => state.performanceManagement.getRecommendationsReducer
  );

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

  const recommendationColumn = [
    {
      title: "RECOMMENDATION TYPE",
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
            setRecommendationId(text.id);
            toggleModal();
          }}
        >
          <i className="fa fa-trash" />
        </Link>
      ),
    },
  ];

  const recommendationHandler = (data) => {
    const newData = {
      data,
      resetField,
      dispatch,
    };
    dispatch(addRecommendation(newData));
  };

  useEffect(() => {
    dispatch(getRecommendations());
  }, []);
  return (
    <div className="tab-pane" id="recommendation_type">
      <form onSubmit={handleSubmit(recommendationHandler)}>
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-lg-4">
            {/* <div className="m-b-10">Enter Recommendation</div> */}
            <div className="form-group">
              <InputField
                register={register}
                name="metric"
                label=" Enter Recommendation"
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
                total: recommendations.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              style={{ overflowX: "auto" }}
              columns={recommendationColumn}
              // bordered
              dataSource={recommendations}
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
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        dispatch(
                          deleteRecommendation({ recommendationId, dispatch })
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
                      className="btn btn-primary cancel-btn"
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
