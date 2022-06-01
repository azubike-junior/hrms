import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  baseUrl,
  performanceManagementAppraisalUrl,
  performanceManagementConfigUrl,
} from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getRecommendations = createAsyncThunk(
  "getRecommendations",
  async () => {
    try {
      const response = await axios.get(
        `${performanceManagementAppraisalUrl}/GetRecommendation`
      );
      // console.log(">>>>response", response)
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data
    }
  }
);

const getRecommendationsSlice = createSlice({
  name: "getRecommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecommendations.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getRecommendations.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getRecommendations.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getRecommendationsSlice.reducer;
