/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import { useForm } from "react-hook-form";
import { classNames } from "../../../utils/classNames";
import { useDispatch, useSelector } from "react-redux";
import { addOrganizationalGoal } from "../../../services/PerformanceManagement/Configurations/organizationalGoal/addOrganizationalGoal";
import { getOrganizationalGoal } from "../../../services/PerformanceManagement/Configurations/organizationalGoal/getOrganizationalGoal";
import { getText } from "../../../utils/helper";
import { deleteOrganizationalGoal } from "../../../services/PerformanceManagement/Configurations/organizationalGoal/deleteOrganizationGoal";
import { useGetCategoriesQuery } from "../../../services/PerformanceManagement/Configurations/getPerformanceConfigs";
import { getCategoryTypes } from "./../../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";

const OrganizationalGoal = () => {
  const dispatch = useDispatch();
  const [organizationalGoalId, setOrganizationalGoalId] = useState();

  const { data: organizationalGoals, loading: organizationGoalsLoading } =
    useSelector(
      (state) => state.performanceManagement.getOrganizationalGoalReducer
    );

  const { data: categories, loading: categoriesLoading } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  // const { data: categories } = useGetCategoriesQuery();

  let allCategories;

  if (categories) {
    allCategories = [
      { categoryId: "", description: "-Select-" },
      ...categories,
    ];
  }

  const setText = (text) => {
    console.log(">>>>>text", text);
    return categories?.find((category) => category.categoryId === text)
      ?.description;
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

  const organizationalGoalHandler = (data) => {
    console.log(">>>dtd", data);
    dispatch(addOrganizationalGoal({ data, reset, dispatch }));
  };

  useEffect(() => {
    dispatch(getOrganizationalGoal());
  }, []);

  useEffect(() => {
    dispatch(getCategoryTypes());
  }, []);

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
      dataIndex: "categoryId",
      render: (text, record) => (
        // setText(text)
        <p>{setText(text)}</p>
      ),
    },
    {
      title: "Organizational Goals",
      dataIndex: "description",
    },
    {
      title: "",
      render: (text, record) => (
        <a
          to="#"
          data-toggle="modal"
          data-target="#delete_organizationalGoal"
          className="btn btn-sm btn-outline-danger m-r-10"
          onClick={() => {
            console.log("orgorg", text);
            setOrganizationalGoalId(text.organizationalGoalId);
          }}
        >
          <i className="fa fa-trash" />
        </a>
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
          <h3 className="user-name m-b-10">Organizational Goals</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <div className="card-body">
            <form onSubmit={handleSubmit(organizationalGoalHandler)}>
              <div className="row flex-column">
                <div className="col-lg-12 m-t-10 m-b-20">
                  <h4 className="user-name m-t-0">Setup Organizational Goal</h4>
                </div>

                <div className="col-lg-4 m-b-10">
                  <div className="m-b-10">Category</div>
                  <div className="form-group">
                    <select
                      {...register("categoryId", { required: true })}
                      className={classNames(
                        errors?.categoryId ? "error-class" : "",
                        "form-control"
                      )}
                    >
                      {allCategories?.map((category) => {
                        return (
                          <option value={category?.categoryId}>
                            {category?.description}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-4 m-b-10">
                  <div className="m-b-10">Organizational Goal</div>
                  <div className="form-group">
                    <textarea
                      {...register("description", { required: true })}
                      className={classNames(
                        errors?.description ? "error-class" : "",
                        "form-control"
                      )}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                  <button
                    href="#"
                    type="submit"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </form>

            <div className="row m-t-50 m-b-20">
              {/* <h4 className="user-name m-b-10 col-md-12">CATEGORY LIST</h4> */}

              <div className="col-md-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: organizationalGoals?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={organizational_columns}
                    // bordered
                    dataSource={organizationalGoals}
                    rowKey={(record) => record.id}
                    onChange={console.log("change")}
                  />
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
        id="delete_organizationalGoal"
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
                    <a
                      href="#"
                      data-dismiss="modal"
                      onClick={() => {
                        const data = { organizationalGoalId, dispatch };
                        console.log(">>>>>>>org", organizationalGoalId);
                        dispatch(deleteOrganizationalGoal(data));
                      }}
                      className="btn btn-block btn-primary"
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="#"
                      data-dismiss="modal"
                      className="btn btn-block btn-outline-danger"
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
export default OrganizationalGoal;
