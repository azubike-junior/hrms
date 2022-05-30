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
import InputField from "../../../components/InputField";
import { useDispatch } from "react-redux";
import { getCategoryTypes } from "../../../services/PerformanceManagement/Configurations/categoryType/getCategoryTypes";
import { useSelector } from "react-redux";
import { addCategoryType } from "../../../services/PerformanceManagement/Configurations/categoryType/addCategoryType";
import { deleteCategoryType } from "../../../services/PerformanceManagement/Configurations/categoryType/deleteCategoryType";
import { toggleEditPerspectiveModal } from "../../../services/modals/modals";
import Loader from '../../../components/Loader';
import EditPerspective from './../../../components/EditPerspective/index';

const Perspective = () => {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("");
  const [perspective, setPerspective] = useState({});

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

  const { data: categories, loading: categoriesLoading } = useSelector(
    (state) => state.performanceManagement.getCategoryTypesReducer
  );

  const { loading: addCategoryLoading } = useSelector(
    (state) => state.performanceManagement.addCategoryTypeReducer
  );

  const categoryTypeHandler = async (data) => {
    dispatch(addCategoryType({ data, reset, dispatch }));
  };

  // useEffect(() => {
  //   if ($(".select").length > 0) {
  //     $(".select").select2({
  //       minimumResultsForSearch: -1,
  //       width: "100%",
  //     });
  //   }
  // });

  useEffect(() => {
    dispatch(getCategoryTypes());
  }, []);

  // Table displayed on Expense Requests Page
  const category_columns = [
    {
      title: "Perspective Name",
      dataIndex: "description",
    },
    {
      title: "",
      render: (text, record) => (
        <div className="">
          <a
            to="#"
            data-toggle="modal"
            data-target="#edit_category"
            className="btn btn-sm btn-outline-primary m-r-10"
            onClick={() => {
              // console.log(text.id);
              setCategoryId(text.categoryId);
              setPerspective(text.description)
              dispatch(toggleEditPerspectiveModal())
            }}
          >
            <i className="fa fa-edit" />
          </a>

          {/* <a
            className="btn btn-sm btn-outline-danger m-r-10"
            to="#"
            data-toggle="modal"
            data-target="#delete_category"
            onClick={() => {
              console.log(text.id);
              setCategoryId(text.id);
            }}
          >
            <i className="fa fa-trash" />
          </a> */}
        </div>
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
          <h3 className="user-name m-b-10">Perspectives</h3>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50 col-lg-12">
          <div className="card-body">
            <form onSubmit={handleSubmit(categoryTypeHandler)}>
              <div className="row">
                <div className="col-lg-12 m-t-10 m-b-20">
                  <h4 className="user-name m-t-0">Setup Perspective</h4>
                </div>
                <InputField
                  register={register}
                  name="categoryType"
                  label="perspective"
                  className="col-lg-5 m-b-10"
                  required
                  type="text"
                  errors={errors?.categoryType}
                />
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                  <button
                    href=""
                    className="btn btn-block btn-suntrust font-weight-700"
                    type="submit"
                  >
                    {addCategoryLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>

            <div className="row m-t-50 m-b-20">
              <h4 className="user-name m-b-10 col-md-12">PERSPECTIVE LIST</h4>

              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table
                    className="table-striped"
                    pagination={{
                      total: categories?.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={category_columns}
                    // bordered
                    dataSource={categories}
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

      <EditPerspective perspective={perspective} categoryId={categoryId}/>

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
                <h3>Delete Perspective</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a
                      href="#"
                      className="btn btn-block btn-primary"
                      data-dismiss="modal"
                      onClick={() =>
                        dispatch(deleteCategoryType({ categoryId, dispatch }))
                      }
                    >
                      Delete
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href=""
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
export default Perspective;
