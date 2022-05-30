import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getTechnicalTraining } from './../../StaffAppraisal/getTechnicalTraining';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteFunctionalMetric = createAsyncThunk(
  "deleteFunctionalMetric",
  async (data, {rejectWithValue}) => {
      const {functionId, dispatch} = data
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/DeleteFunctionalTraining/id?Id=${functionId}`
      );

      console.log(response)

      if (response.status === 200) {
        Swal.fire(`Metric has been Deleted`, "Successful!", "success").then(
          () => {
            dispatch(getTechnicalTraining());
          }
        );
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteFunctionalMetricSlice = createSlice({
  name: "deleteFunctionalMetric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteFunctionalMetric.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteFunctionalMetric.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteFunctionalMetric.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteFunctionalMetricSlice.reducer;
