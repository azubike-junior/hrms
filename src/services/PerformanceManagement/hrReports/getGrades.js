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

export const getGrades = createAsyncThunk("getGrades", async () => {
  try {
    const response = await axios.get(`${performanceManagementUrl}/getGrades`);

    console.log(">>>>>repsone", response);

    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (e) {
    return e.response.data
  }
});

const getGradesSlice = createSlice({
  name: "getGrades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGrades.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getGrades.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getGrades.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getGradesSlice.reducer;
