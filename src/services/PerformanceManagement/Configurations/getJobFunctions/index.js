import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  performanceManagementUrl
} from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getJobFunctions = createAsyncThunk("getJobFunctions", async () => {
  try {
    const response = await axios.get(
      `${performanceManagementUrl}/getAllJobFunctions`
    );
    console.log(">>>>respomse", response);
    if (response.responseCode === 200) {
      return response.data;
    }
    return response.data;
  } catch (e) {
    return e.response.data
  }
});

const getJobFunctionsSlice = createSlice({
  name: "getJobFunctions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobFunctions.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getJobFunctions.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getJobFunctions.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getJobFunctionsSlice.reducer;
