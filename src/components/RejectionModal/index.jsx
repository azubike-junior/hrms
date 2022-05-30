import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rejectAppraisal } from "../../services/PerformanceManagement/StaffAppraisal/rejectAppraisal";
import { useHistory } from "react-router-dom";
import Loader from './../Loader/index';

export default function RejectionModal({
  toggleModal,
  supervisorName,
  appraisalReference,
  status,
  rejectionStage,
  rejectingStaffId,
}) {
  const { loading: rejectionLoading } = useSelector(
    (state) => state.performanceManagement.rejectAppraisalReducer
  );
  // console.log(">>>>>>>supervisor", supervisorName, appraisalReference);

  const dispatch = useDispatch();
  const history = useHistory();
  const [reasonForRejection, setReasonForRejection] = useState("");

  const submitRejection = () => {
    if (!reasonForRejection) {
      return;
    }
    const data = {
      appraisalReference,
      rejectedBy: supervisorName,
      reasonForRejection,
      dispatch,
      history,
      toggleModal,
      status,
      rejectionStage,
      rejectingStaffId: "081",
    };

    console.log(">>>>>.dtaa", data);
    dispatch(rejectAppraisal(data));
  };

  return (
    <div classNameName="modal-90w  modal-dialog-centered">
      <div className="modal-content">
        <div
          className="modal-header bg-danger align-items-center justify-content-center"
          // style={{ ma: "middle" }}
        >
          <h5 className="modal-title text-white mb-3" id="modal_title_6">
            REJECT APPRAISAL
          </h5>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center">
            <h5>Add a Comment</h5>
            <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-10 font-weight-700">
              <textarea
                className="form-control m-b-10"
                onChange={(e) => setReasonForRejection(e.target.value)}
                rows="3"
                style={{ resize: "none" }}
                placeholder="Your Reason For Rejecting The Appraisal"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer justify-content-center align-items-center">
          <button
            disabled={!reasonForRejection}
            className="btn btn-block btn-success font-weight-700 col-sm-4"
            data-dismiss="modal"
            onClick={() => submitRejection()}
          >
            {rejectionLoading ? <Loader /> : "Confirm"}
          </button>
          <a
            className="btn btn-block text-danger font-weight-700 col-sm-4"
            data-dismiss="modal"
            onClick={() => {
              toggleModal();
            }}
          >
            CANCEL
          </a>
        </div>
      </div>
    </div>
  );
}
