import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementAppraisalUrl } from "../../../utils/helper";
import { getAppraisalsBySupervisorId } from "./getAppraisalsBySupervisorId";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const rejectAppraisal = createAsyncThunk(
  "rejectAppraisal",
  async (data, {rejectWithValue}) => {
    const { dispatch, history, toggleModal, ...rest } = data;
    // console.log(">>>dta", appraisalRef);

    try {
      const response = await axios.post(
        `${performanceManagementAppraisalUrl}/RejectAppraisal`,
        rest
      );

      if (response.data.responseCode === "00") {
        Swal.fire(`Appraisal has been Rejected`, "success").then(() => {
          dispatch(getAppraisalsBySupervisorId("083"));
          toggleModal();
          history.push("/hrms/allStaffAppraisals")
        });
        return response.data;
      }

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const rejectAppraisalSlice = createSlice({
  name: "rejectAppraisal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rejectAppraisal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(rejectAppraisal.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(rejectAppraisal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default rejectAppraisalSlice.reducer;
