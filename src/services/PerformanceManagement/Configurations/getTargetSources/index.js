import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  baseUrl,
  performanceManagementConfigUrl,
} from "../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getTargetSource = createAsyncThunk(
  "getTargetSource",
  async () => {
    console.log(">>>>>>>>>>getTarget oooooo")
    try {
      const response = await axios.get(
        `http://10.11.200.97/PerformanceManagement/Configuration/GetTargetSources`
      );

      // console.log(">>>>response", response)
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const getTargetSourceSlice = createSlice({
  name: "getTargetSource",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTargetSource.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getTargetSource.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getTargetSource.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getTargetSourceSlice.reducer;
