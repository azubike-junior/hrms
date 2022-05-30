import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { getRecommendations } from "./getRecommendation";

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

export const addRecommendation = createAsyncThunk(
  "addRecommendation",
  async ({ data, resetField, dispatch }, { rejectWithValue }) => {
    const { metric } = data;
    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/addRecommendation?metric=${metric}`
      );
      if (response.status === 200) {
        Swal.fire(
          `Recommendation has been added`,
          "Successful!",
          "success"
        ).then(() => {
          resetField("metric");
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

const addRecommendationSlice = createSlice({
  name: "addRecommendation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRecommendation.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addRecommendation.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addRecommendation.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addRecommendationSlice.reducer;
