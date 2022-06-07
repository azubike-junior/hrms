import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getIndividualKpis } from './getIndividualKpi';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteKpi = createAsyncThunk(
  "deleteKpi",
  async ({ kpiId, dispatch, toggleModal }, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/DeleteIndividualKpi/id?Id=${kpiId}`
      );
      if (response.data.responseCode === "00") {
        dispatch(getIndividualKpis());
        toggleModal()
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteKpiSlice = createSlice({
  name: "deleteKpi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteKpi.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteKpi.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteKpi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteKpiSlice.reducer;
