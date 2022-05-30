import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementAppraisalUrl } from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const getAppraisalByReferenceId = createAsyncThunk(
  "getAppraisalByReferenceId",
  async (appraisalReference, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${performanceManagementAppraisalUrl}/GetAppraisalByReferenceId?Id=${appraisalReference}`
      );

      console.log(">>>>>>>>>response", response)

      if (response.status === 200) {
        return response.data;
      }

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const getAppraisalByReferenceIdSlice = createSlice({
  name: "getAppraisalByReferenceId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppraisalByReferenceId.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAppraisalByReferenceId.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getAppraisalByReferenceId.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getAppraisalByReferenceIdSlice.reducer;
