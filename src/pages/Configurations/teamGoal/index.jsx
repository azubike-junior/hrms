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
import {
  useGetCategoriesQuery,
  useGetOrganizationalGoalsQuery,
  useGetTeamGoalsQuery,
} from "../../../services/PerformanceManagement/Configurations/getPerformanceConfigs";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTeamGoal } from "./../../../services/PerformanceManagement/Configurations/teamGoal/addTeamGoal";
import { getTeamGoals } from "./../../../services/PerformanceManagement/Configurations/teamGoal/getTeamGoals";
import { useSelector } from "react-redux";
import { classNames } from "./../../../utils/classNames";
import { deleteTeamGoal } from "./../../../services/PerformanceManagement/Configurations/teamGoal/deleteTeamGoal";
import { getOrganizationalGoalsByCategory } from "../../../services/PerformanceManagement/Configurations/organizationalGoal/getOrganizationGoalByCategory";
import Loader from "./../../../components/Loader/index";
import { getCategoryTypes } from "./../../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import Modal from "react-bootstrap/Modal";


const TeamGoal = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const [categoryId, setCategoryId] = useState("");
  const { data: categories, loading: categoriesLoading } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  const [teamGoalId, setTeamGoalId] = useState("");

  const { data: teamGoals } = useSelector(
    (state) => state.performanceManagement.getTeamGoalsReducer
  );

  const { loading: addTeamLoading } = useSelector(
    (state) => state.performanceManagement.teamGoalReducer
  );

  const { data: orgGoals } = useSelector(
    (state) =>
      state.performanceManagement.getOrganizationalGoalsByCategoryReducer
  );

  const handleGetOrganizationalGoal = (e) => {
    console.log(e.target.value);
    dispatch(getOrganizationalGoalsByCategory(e.target.value));
  };

  const setCategoryDesc = (text) => {
    return categories?.find((category) => category.categoryId === text)
      ?.description;
  };

  const setOrgDesc = (text) => {
    return orgGoals?.find((org) => org.organizationalGoalId === text)
      ?.description;
  };

  console.log(">>>>>>>orgGoals", orgGoals);

  let allCategories;

  if (categories) {
    allCategories = [
      { categoryId: "", description: "-Select-" },
      ...categories,
    ];
  }

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

  const submitTeamGoalHandler = (data) => {
    console.log(">>>>>data", data);
    dispatch(addTeamGoal({ data, reset, dispatch }));
  };

  useEffect(() => {
    dispatch(getTeamGoals());
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
  const team_columns = [
    {
      title: "Category Type",
      dataIndex: "category",
    },
    {
      title: "Organizational Goals",
      dataIndex: "organizationalGoal",
    },
    {
      title: "Team Goals",
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
            toggleModal()
            setTeamGoalId(text.teamGoalId);
          }}
        >
          <i className="fa fa-trash" />
        </Link>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Configurations - Team Goal</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="">
          <h3 className="user-name m-b-10">Team Goals</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <div className="card-body">
            <form onSubmit={handleSubmit(submitTeamGoalHandler)}>
              <div className="row flex-column">
                <div className="col-lg-12 m-t-10 m-b-20">
                  <h4 className="user-name m-t-0">Setup Team Goal</h4>
                </div>

                <div className="col-lg-6 m-b-10">
                  <div className="m-b-10">Category</div>
                  <div className="form-group">
                    <select
                      {...register("categoryId", { required: true })}
                      className={classNames(
                        errors?.categoryId ? "error-class" : "",
                        "form-control"
                      )}
                      onChange={(e) => handleGetOrganizationalGoal(e)}
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

                <div className="col-lg-6 m-b-10">
                  <div className="m-b-10">Organizational Goal</div>
                  <div className="form-group">
                    <select
                      {...register("organizationalGoalId", { required: true })}
                      className={classNames(
                        errors?.organizationalGoalId ? "error-class" : "",
                        "form-control"
                      )}
                    >
                      {orgGoals?.map((orgGoal) => {
                        return (
                          <option value={orgGoal?.organizationalGoalId}>
                            {orgGoal?.description}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6 m-b-10">
                  <div className="m-b-10">Team Goal</div>
                  <div className="form-group">
                    <textarea
                      {...register("description", { required: true })}
                      className={classNames(
                        errors?.description ? "error-class" : "",
                        "form-control"
                      )}
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                  <button
                    href=""
                    type="submit"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    {addTeamLoading ? <Loader /> : "Submit"}
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
                      total: teamGoals?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={team_columns}
                    // bordered
                    dataSource={teamGoals}
                    rowKey={(record) => record.id}
                    // onChange={console.log("change")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}

      {/* Delete Request Modal */}
      <Modal show={openModal} centered backdrop="static" keyboard={false}>
        <div className="modal-90w  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Team Goal</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <button
                      href="#"
                      data-dismiss="modal"
                      className="btn btn-block btn-outline-danger"
                      onClick={() => {
                        const data = { teamGoalId, dispatch, toggleModal };
                        dispatch(deleteTeamGoal(data));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => toggleModal()}
                      className="btn btn-block btn-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* /Delete Request Modal */}
    </div>
  );
};
export default TeamGoal;
