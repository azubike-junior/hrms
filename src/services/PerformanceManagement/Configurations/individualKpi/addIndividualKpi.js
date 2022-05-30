import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getIndividualKpis } from './getIndividualKpi';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addIndividualKpi = createAsyncThunk(
  "addIndividualKpi",
  async ({ data, reset, dispatch }, { rejectWithValue }) => {
    console.log(">>>>data", data);
    try {
    const response = await axios.post(`${performanceManagementConfigUrl}/SubmitIndividualKpi`, data);
    console.log(">>>>individu", response)
      if (response.status === 200) {
        Swal.fire(`Kpi has been added`, "Successful!", "success").then(
          () => {
            dispatch(getIndividualKpis());
            reset();
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

const addIndividualKpiSlice = createSlice({
  name: "addIndividualKpi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addIndividualKpi.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addIndividualKpi.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addIndividualKpi.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addIndividualKpiSlice.reducer;
