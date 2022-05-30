/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../paginationfunction";

import "../../../antdstyle.css";

const UnitKPI = () => {
  const [organizational_data, setOrganizationalData] = useState([
    // Process Category begins here
    {
      id: 1,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi:
        "Self-help reports built for internal customers within a period",
      measure_target: "40",
      rate_type: "%",
      weight_percentage: "10",
    },
    {
      id: 2,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi: "% Completion of all projects committed to for delivery",
      measure_target: "90",
      rate_type: "%",
      weight_percentage: "15",
    },
    {
      id: 3,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi: "% Provision of quarterly DB/CBA capacity report",
      measure_target: "100",
      rate_type: "%",
      weight_percentage: "5",
    },
    {
      id: 4,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi:
        "Maintain 95% success rate for changes in line with IT Governance  and quarterly capacity report of DB/CBA",
      measure_target: "95",
      rate_type: "%",
      weight_percentage: "5",
    },
    {
      id: 5,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi:
        "Ensure database performance tuning / CBA ugrade is done quarterly for improved performance across the Bank's CBA and all databases",
      measure_target: "100",
      rate_type: "%",
      weight_percentage: "10",
    },
    {
      id: 6,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi:
        "Generation of RCA within 24 hours of incident occurrence  for which root cause was determined.",
      measure_target: "24",
      rate_type: "hrs",
      weight_percentage: "5",
    },
    {
      id: 7,
      category_name: "Process",
      organ_goal: "Codified and Automated Processes and Manuals",
      dept_goal: "Ensure optimal performance on all core deliverables",
      unit_kpi: "System Uptime % DB/CBA availability",
      measure_target: "98",
      rate_type: "%",
      weight_percentage: "8",
    },
    {
      id: 8,
      category_name: "Process",
      organ_goal: "Zero Governace Breaches, Regulatory Penalties and Fines",
      dept_goal:
        "Ensure total compliance with regulations and internal policies",
      unit_kpi: "% Audit Rating",
      measure_target: "100",
      rate_type: "%",
      weight_percentage: "5",
    },

    // Customer Category begins here
    {
      id: 9,
      category_name: "Customer",
      organ_goal: "External Net Promoter Score (Customer Experience) > 70%",
      dept_goal:
        "Maintain excellent service delivery to internal customers (regulatory enquiries, error free offer letters, credit checks, etc)",
      unit_kpi: "% Customer satisfaction",
      measure_target: "80",
      rate_type: "%",
      weight_percentage: "5",
    },
    {
      id: 10,
      category_name: "Customer",
      organ_goal: "External Net Promoter Score (Customer Experience) > 70%",
      dept_goal:
        "Maintain excellent service delivery to internal customers (regulatory enquiries, error free offer letters, credit checks, etc)",
      unit_kpi: "Service Desk Time to Resolve",
      measure_target: "8 hrs",
      rate_type: "%",
      weight_percentage: "5",
    },

    // Financial Category begins here
    {
      id: 11,
      category_name: "Financial",
      organ_goal: "Total Customer Liabilities of N100 Billion",
      dept_goal: "Drive balance sheet growth",
      unit_kpi: "Value of deposit target",
      measure_target: "150m",
      rate_type: "N",
      weight_percentage: "10",
    },
    {
      id: 12,
      category_name: "Financial",
      organ_goal: "Profitability of N1 Billion",
      dept_goal:
        "Minimize operational losses due to data privacy and database security breaches",
      unit_kpi: "Value of operational losses",
      measure_target: "0",
      rate_type: "N",
      weight_percentage: "3",
    },
    {
      id: 13,
      category_name: "Financial",
      organ_goal: "Profitability of N1 Billion",
      dept_goal: "Achieve optimal Implementation of Opex",
      unit_kpi: "% Implementation of OpEx budget",
      measure_target: "100",
      rate_type: "%",
      weight_percentage: "3",
    },
    {
      id: 14,
      category_name: "Financial",
      organ_goal: "Profitability of N1 Billion",
      dept_goal: "Achieve optimal Implementation of Capex",
      unit_kpi: "% Implementation of Capex budget",
      measure_target: "80%",
      rate_type: "≥",
      weight_percentage: "3",
    },
    {
      id: 15,
      category_name: "Financial",
      organ_goal: "Profitability of N1 Billion",
      dept_goal: "Drive cost savings",
      unit_kpi: "% Cost savings on Budget",
      measure_target: "5%",
      rate_type: "%",
      weight_percentage: "3",
    },

    // Capacity Development Category begins here
    {
      id: 16,
      category_name: "Capacity Development",
      organ_goal: "Human Capacity Development Index  > 70%",
      dept_goal:
        "Pursue self-development as well as training hours on SunTrust Academy",
      unit_kpi: "Relevant Professional Certifications/Trainings",
      measure_target: "40",
      rate_type: "%",
      weight_percentage: "10",
    },
    {
      id: 17,
      category_name: "Capacity Development",
      organ_goal: "Human Capacity Development Index  > 70%",
      dept_goal:
        "Pursue self-development as well as training hours on SunTrust Academy",
      unit_kpi: "Completed Courses on SunTrust Academy",
      measure_target: "40",
      rate_type: "%",
      weight_percentage: "10",
    },
  ]);

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  // Table displayed on
  const organizational_columns = [
    {
      title: "Category Type",
      dataIndex: "category_name",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Organizational Goals",
      dataIndex: "organ_goal",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Department Goals",
      dataIndex: "dept_goal",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Unit KPI",
      dataIndex: "unit_kpi",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Measurable Target",
      dataIndex: "measure_target",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Rate Type",
      dataIndex: "rate_type",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Weight (Must add up to 100)",
      dataIndex: "weight_percentage",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "",
      render: (text, record) => (
        <Link
          to="#"
          data-toggle="modal"
          data-target="#delete_category"
          className="btn btn-sm btn-outline-danger m-r-10"
        >
          <i className="fa fa-trash" />
        </Link>
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
          <h3 className="user-name m-b-10">Unit KPI</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12 m-t-10 m-b-20">
                <h4 className="user-name m-t-0">Setup Unit KPI</h4>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Category</div>
                <div className="form-group">
                  <select className="select">
                    <option>Process</option>
                    <option>Customer</option>
                    <option>Financial</option>
                    <option>Capacity Development</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Organizational Goal</div>
                <div className="form-group">
                  <select className="select">
                    <option>
                      Codified and Automated Processes and Manuals
                    </option>
                    <option>
                      Zero Governance Breaches, Regulatory Penalties and Fines
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Department Goal</div>
                <div className="form-group">
                  <select className="select">
                    <option>
                      Ensure optimal performance on all core deliverables
                    </option>
                    <option>
                      Ensure total compliance with regulations and internal
                      policies
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6 m-b-10">
                <div className="m-b-10">Unit KPI</div>
                <div className="form-group">
                  <select className="select">
                    <option>
                      Self-help reports built for internal customers within a
                      period
                    </option>
                    <option>
                      % Completion of all projects committed to for delivery
                    </option>
                    <option>
                      % Provision of quarterly DB/CBA capacity report
                    </option>
                    <option>
                      Maintain 95% success rate for changes in line with IT
                      Governance and quarterly capacity report of DB/CBA
                    </option>
                    <option>
                      Ensure database performance tuning / CBA ugrade is done
                      quarterly for improved performance across the Bank's CBA
                      and all databases
                    </option>
                    <option>
                      Generation of RCA within 24 hours of incident occurrence
                      for which root cause was determined.
                    </option>
                    <option>"System Uptime % DB/CBA availability"</option>
                  </select>
                  {/* <textarea className="form-control" rows="3" /> */}
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Measurable Target (Metric)</div>
                <div className="form-group">
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Rate Type (Metric)</div>
                <div className="form-group">
                  <select className="select">
                    <option>Fixed Value</option>
                    <option>Hours (hrs)</option>
                    <option>Percentage (%)</option>
                    <option>Money Target (&#8358;)</option>
                    <option>Greater Than (&ge;)</option>
                    <option>Less than (&le;)</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Weight (Must add up to 100%)</div>
                <div className="form-group">
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                <a
                  href=""
                  className="btn btn-block btn-primary font-weight-700"
                >
                  ADD
                </a>
              </div>
            </div>

            <div className="row m-t-50 m-b-20">
              {/* <h4 className="user-name m-b-10 col-md-12">CATEGORY LIST</h4> */}

              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: organizational_data.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={organizational_columns}
                    // bordered
                    dataSource={organizational_data}
                    rowKey={(record) => record.id}
                    onChange={console.log("change")}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-20">
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
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* Delete Request Modal */}
      <div
        className="modal custom-modal fade"
        id="delete_category"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Category</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="" className="btn btn-primary continue-btn">
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
                      data-dismiss="modal"
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
      </div>
      {/* /Delete Request Modal */}
    </div>
  );
};
export default UnitKPI;
