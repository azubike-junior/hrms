import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, performanceManagementConfigUrl } from './../../../../utils/helper';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getTeamGoals = createAsyncThunk("getTeamGoals", async () => {
  try {
    const response = await axios.get(`${performanceManagementConfigUrl}/GetTeamGoals`);
    console.log(">>>>respomse", response)
    if (response.responseCode === 200) {
      return response.data;
    }
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

const getTeamGoalsSlice = createSlice({
  name: "getTeamGoals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamGoals.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getTeamGoals.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getTeamGoals.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getTeamGoalsSlice.reducer;
