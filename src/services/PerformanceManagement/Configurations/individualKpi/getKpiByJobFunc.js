import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  baseUrl,
  performanceManagementConfigUrl,
} from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getKpiByJobFunc = createAsyncThunk(
  "getKpiByJobFunction",
  async (values) => {
    const { setAllKPIs, jobId } = values;
    console.log(">>>>>setAllKpis", setAllKPIs, jobId);
    try {
      const response = await axios.get(
        `${performanceManagementConfigUrl}/GetAllKpiByJobFunction/id?id=${jobId}`
      );
      // console.log(">>>>.response", response)
      if (response.status === 200) {
          console.log(">>>>>response", response.data)
        setAllKPIs(response.data);
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const getKpiByJobFuncSlice = createSlice({
  name: "getKpiByJobFunction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKpiByJobFunc.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getKpiByJobFunc.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getKpiByJobFunc.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getKpiByJobFuncSlice.reducer;
