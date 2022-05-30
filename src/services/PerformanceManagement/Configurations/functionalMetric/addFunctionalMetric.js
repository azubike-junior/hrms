import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { getTechnicalTraining } from "./../../StaffAppraisal/getTechnicalTraining";
import {
  baseUrl,
  performanceManagementConfigUrl,
} from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addFunctionalMetric = createAsyncThunk(
  "addFunctionalMetric",
  async ({ data, resetField, dispatch }, { rejectWithValue }) => {
    const { metric } = data;
    try {
    const response = await axios.post(
        `${performanceManagementConfigUrl}/AddFunctionalMetric?metric=${metric}`
      );
      if (response.status === 200) {
        Swal.fire(
          `Functional Metric has been added`,
          "Successful!",
          "success"
        ).then(() => {
          // resetField("description");
          dispatch(getTechnicalTraining());
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const addFunctionalMetricSlice = createSlice({
  name: "addFunctionalMetric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFunctionalMetric.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addFunctionalMetric.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addFunctionalMetric.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addFunctionalMetricSlice.reducer;
