import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toggleEditPerspectiveModal } from "../../services/modals/modals";
import { editPerspective } from "../../services/PerformanceManagement/Configurations/categoryType/editPerspective";
import InputField from './../InputField/index';

export default function EditPerspective({ perspective, categoryId }) {
  const { openEditPerspective } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  console.log(">>>>>>>perspective", perspective, categoryId);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const resetFields = () => {
    resetField("description");
  };

  const updatePerspective = (data) => {
    const allData = {
      perspective: data.description,
      id: categoryId,
      dispatch,
      reset,
    };

    console.log("><<<<<alldata", allData);
    dispatch(editPerspective(allData));
  };

  return (
    <Modal
      show={openEditPerspective}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-90w modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Perspective</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                resetFields();
                dispatch(toggleEditPerspectiveModal());
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(updatePerspective)}>
              <div class="d-flex align-items-center justify-content-center">
                <InputField
                  register={register}
                  name="description"
                  label="Perspective"
                  defaultValue={perspective}
                  className="col-lg-6"
                  required
                  type="text"
                  errors={errors?.description}
                />
              </div>

              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
