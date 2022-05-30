import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  baseUrl,
  performanceManagementConfigUrl,
} from "./../../../../utils/helper";
import { getBehavioralMetrics } from "./getBehavioralMetric";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addBehavioralMetric = createAsyncThunk(
  "addBehavioralMetric",
  async ({ data, reset, dispatch }, { rejectWithValue }) => {
    const { metric } = data;
    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/AddBehaviouralMetric?metric=${metric}`
      );
      if (response.status === 200) {
        Swal.fire(
          `behavioral Metric has been added`,
          "Successful!",
          "success"
        ).then(() => {
          dispatch(getBehavioralMetrics());
          reset();
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const addBehavioralMetricSlice = createSlice({
  name: "addBehavioralMetric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBehavioralMetric.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addBehavioralMetric.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addBehavioralMetric.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addBehavioralMetricSlice.reducer;
