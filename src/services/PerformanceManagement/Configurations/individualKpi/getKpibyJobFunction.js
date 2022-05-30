import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  baseUrl,
  performanceManagementConfigUrl,
} from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getKpiByJobFunction = createAsyncThunk(
  "getKpiByJobFunction",
  async (jobId, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${performanceManagementConfigUrl}/GetAllKpiByJobFunction/id?id=${jobId}`
      );
      // console.log(">>>>.response", response)
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const getKpiByJobFunctionSlice = createSlice({
  name: "getKpiByJobFunction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKpiByJobFunction.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getKpiByJobFunction.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getKpiByJobFunction.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getKpiByJobFunctionSlice.reducer;
