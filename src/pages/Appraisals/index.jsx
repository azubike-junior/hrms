import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../components/pagination";
import "../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getAppraisalsByStaffId } from "../../services/PerformanceManagement/StaffAppraisal/getAppraisalsByStaffId";
import $ from "jquery";

const Appraisals = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { data: appraisals, loading: appraisalsLoading } = useSelector(
    (state) => state.performanceManagement.getAppraisalsByStaffIdReducer
  );

  const staffData = JSON.parse(localStorage.getItem("cachedData"));

  const { staffId } = staffData;

//   useEffect(() => {
//     if ($(".select").length > 0) {
//       $(".select").select2({
//         minimumResultsForSearch: -1,
//         width: "100%",
//       });
//     }
//   });

  // useEffect(() => {
  //   let firstload = localStorage.getItem("firstload");
  //   if (firstload === "true") {
  //     setTimeout(function () {
  //       window.location.reload(1);
  //       localStorage.removeItem("firstload");
  //     }, 1000);
  //   }
  // });


  useEffect(() => {
    dispatch(getAppraisalsByStaffId(staffId));
  }, []);

  // Table displayed on Expense Page
  const columns = [
    {
      title: "Staff ID",
      dataIndex: "staffId",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Staff Name",
      dataIndex: "appraiseeName",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
      sorter: (a, b) => a.name.length - b.name.length,
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
          {text === "ONHOLD" && (
            <>
              <span class="badge badge-primary text-white px-3 py-2 font-16">
                ON-HOLD
              </span>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Submitted Date",
      dataIndex: "dateSubmitted",
    },
    {
      title: "",
      render: (text, record) => (
        <div>
          <button
            className="btn btn-sm btn-outline-primary m-r-10"
            disabled={text.status === "ONHOLD"}
            onClick={() => {
              history.push(
                `/hrms/appraiseeUpdatedReview/${text.appraisalReference}`
              );
            }}
          >
            <i className="fa fa-eye m-r-5" />
            VIEW
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Performance Management | Appraisals</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}

      <div className="content container-fluid mt-4">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Appraisals</h3>
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
                  total: appraisals.length,
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
                dataSource={appraisals}
                rowKey={(record) => record.id}
                // onChange={console.log("change")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* /Page Content */}
    </div>
  );
};

export default Appraisals;
