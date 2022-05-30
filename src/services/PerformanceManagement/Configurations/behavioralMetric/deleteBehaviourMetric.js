import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { getBehavioralMetrics } from "./getBehavioralMetric";


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

export const deleteBehaviorMetric = createAsyncThunk(
  "deleteBehaviorMetric",
  async (data, {rejectWithValue}) => {
      const {behaviorId, dispatch} = data;
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/deleteBehaviouralTraining/id?Id=${behaviorId}`
      );

      if (response.status === 200) {
        Swal.fire(
          `Metric has been Deleted`,
          "Successful!",
          "success"
        ).then(() => {
          dispatch(getBehavioralMetrics());
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteBehaviorMetricSlice = createSlice({
  name: "deleteBehaviorMetric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteBehaviorMetric.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteBehaviorMetric.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteBehaviorMetric.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteBehaviorMetricSlice.reducer;
