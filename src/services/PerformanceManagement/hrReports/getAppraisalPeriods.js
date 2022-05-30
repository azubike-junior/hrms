import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  performanceManagementAppraisalUrl,
  performanceManagementUrl,
} from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getAllAppraisalPeriods = createAsyncThunk(
  "getAllAppraisalPeriods",
  async ({}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${performanceManagementAppraisalUrl}/getAppraisalPeriods`
      );

      if (response.status === 200) {
        return response.data;
      }

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const getAllAppraisalPeriodsSlice = createSlice({
  name: "getAllAppraisalPeriods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAppraisalPeriods.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAllAppraisalPeriods.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getAllAppraisalPeriods.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getAllAppraisalPeriodsSlice.reducer;
