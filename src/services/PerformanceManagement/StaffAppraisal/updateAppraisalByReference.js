import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementAppraisalUrl } from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const updateAppraisalByReference = createAsyncThunk(
  "updateAppraisalByReference",
  async (data, { rejectWithValue }) => {
    const { appraisals, history, clearKPIs } = data;
    // console.log("appppp", appraisals);
    try {
      const response = await axios.post(
        `${performanceManagementAppraisalUrl}/UpdateAppraisalByReference`,
        appraisals
      );
      console.log(">>>>individu", response);
      if (response.data.responseCode === "00") {
        Swal.fire(
          `Appraisal has been submitted`,
          "Successful!",
          "success"
        ).then(() => {
          history.push("/hrms/staffAppraisals");
          clearKPIs();
        });
        return response.data;
      }
      if (response.data.responseCode === "97") {
        Swal.fire(
          `${response.data.responseMessage}`,
          "Unsuccessful!",
          "error"
        ).then(() => {});
        return response.data;
      }
      if (response.data.responseCode === "96") {
        Swal.fire(`Sorry, an Error ocurred`, "Error!", "error").then(() => {
          // reset();
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const updateAppraisalByReferenceSlice = createSlice({
  name: "updateAppraisalByReference",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAppraisalByReference.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(updateAppraisalByReference.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(updateAppraisalByReference.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default updateAppraisalByReferenceSlice.reducer;
