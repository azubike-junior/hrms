import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  performanceManagementAppraisalUrl,
  performanceManagementUrl,
} from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getAppraisalsByDate = createAsyncThunk(
  "getAppraisalsByDate",
  async (data, {rejectWithValue}) => {
    const { startDate, endDate, setAllAppraisals } = data;
    try {
      const response = await axios.get(
        `${performanceManagementAppraisalUrl}/GetAppraisalsByDate?startDate=${startDate}&endDate=${endDate}`
      );

      if (response.status === 200) {
        setAllAppraisals(response.data);
        return response.data;
      }

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const getAppraisalsByDateSlice = createSlice({
  name: "getAppraisalsByDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppraisalsByDate.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAppraisalsByDate.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getAppraisalsByDate.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getAppraisalsByDateSlice.reducer;
