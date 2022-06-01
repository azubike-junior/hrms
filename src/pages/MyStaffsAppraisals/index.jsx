import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
// import { itemRender, onShowSizeChange } from "../../paginationfunction";
import "../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { getAppraisalsBySupervisorId } from "../../services/PerformanceManagement/StaffAppraisal/getAppraisalsBySupervisorId";
import { rejectAppraisal } from "../../services/PerformanceManagement/StaffAppraisal/rejectAppraisal";
import Modal from "react-bootstrap/Modal";
import Loader from './../../components/Loader';
import { onShowSizeChange, itemRender } from './../../components/pagination';


const StaffsAppraisals = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [appraisalRef, setAppraisalRef] = useState("");

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const { data: supervisorAppraisals, loading: appraisalsLoading } =
    useSelector(
      (state) => state.performanceManagement.getAppraisalsBySupervisorIdReducer
    );

  // console.log(">>>>>data", supervisorAppraisals);

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  const { supervisorStaffId, staffId } = staffData;

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  useEffect(() => { 
    dispatch(getAppraisalsBySupervisorId(staffId));
  }, []);

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
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="table-avatar">
          {text === "SUBMITTED" && (
            <>
              <span class="badge badge-primary text-white px-3 py-2 font-16">
                Supervisor Input Required
              </span>
              {/* <i className="las la-info-circle m-l-10" />{" "} */}
            </>
          )}
          {text === "PROCESSING" && (
            <>
              <span class="badge badge-success text-white px-3 py-2 font-16">
                Appraisee Input Required
              </span>
              {/* <i className="las la-info-circle m-l-10" />{" "} */}
            </>
          )}
          {text === "INPROGRESS" && (
            <>
              <span class="badge badge-success text-white px-3 py-2 font-16">
                Second Supervisor Input Required
              </span>
              {/* <i className="las la-info-circle m-l-10" />{" "} */}
            </>
          )}
          {text === "COMPLETE" && <h2 className="table-avatar">COMPLETE</h2>}

          {text === "REJECTED" && <h2 className="table-avatar">REJECTED</h2>}
        </div>
      ),
    },

    {
      title: "Submitted Date",
      dataIndex: "dateSubmitted",
    },

    {
      title: "Action",
      render: (text, record) => (
        // console.log()
        <Link
          onClick={() => console.log("text", text.status)}
          to={
            text.status === "SUBMITTED"
              ? `/hrms/staffAppraisalDetail/${text.appraisalReference}`
              : `/hrms/preprocessAppraisal/${text.appraisalReference}`
          }
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          VIEW
        </Link>
      ),
    },
    // {
    //   title: "",
    //   render: (text, record) =>
    //     text.rejectionStage === 5 && (
    //       <Link
    //         onClick={() => console.log("text", text.status)}
    //         to={`/performanceManagement/updateSupervisorComment/${text.appraisalReference}`}
    //         className="btn btn-sm btn-outline-primary m-r-10"
    //       >
    //         <i className="fa fa-eye m-r-5" />
    //         VIEW
    //       </Link>
    //     ),
    // },
    // {
    //   title: "",
    //   render: (text, record) =>
    //     text.status === "COMPLETE" || text.status === "INPROGRESS" ? (
    //       ""
    //     ) : (
    //       <Link
    //         onClick={() => {
    //           setAppraisalRef(text.appraisalReference);
    //           toggleModal();
    //         }}
    //         className="btn btn-sm btn-outline-danger m-r-10"
    //       >
    //         <i className="fa fa-refresh pr-2" aria-hidden="true"></i>
    //         REJEC
    //       </Link>
    //     ),
    // },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Expense Management | My Requests</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}

      <div className="content container-fluid mt-4">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Supervisor Appraisals</h3>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        {/* Search Filter */}
        <div className="row filter-row">
          {/* <div className="col-lg-10 col-sm-10 col-md-10">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">
                Search for a Staff (e.g. ST-0019)
              </label>
            </div>
          </div> */}

          {/* <div className="col-sm-2 col-md-2">
            <a href="#" className="btn btn-block btn-suntrust font-weight-700">
              {" "}
              Search{" "}
            </a>
          </div> */}
        </div>
        {/* Search Filter */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: supervisorAppraisals.length,
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
                dataSource={supervisorAppraisals}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* /Page Content */}
      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-90w  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Appraisal Rejection</h3>
                <p>Are you sure you want to reject this appraisal</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        const data = { appraisalRef, dispatch, toggleModal };
                        dispatch(rejectAppraisal(data));
                        toggleModal();
                      }}
                    >
                      Yes
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
};

export default StaffsAppraisals;
