import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { getRecommendations } from "./getRecommendation";

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

export const deleteRecommendation = createAsyncThunk(
  "deleteRecommendation",
  async (data, {rejectWithValue}) => {
      const {recommendationId, dispatch} = data
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/DeleteRecommendation/id?Id=${recommendationId}`
      );

      if (response.status === 200) {
        Swal.fire(
          `Recommendation has been Deleted`,
          "Successful!",
          "success"
        ).then(() => {
          dispatch(getRecommendations());
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteRecommendationSlice = createSlice({
  name: "deleteRecommendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteRecommendation.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteRecommendation.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteRecommendation.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteRecommendationSlice.reducer;
