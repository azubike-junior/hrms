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

export const getTeamGoalsByOrganizationId = createAsyncThunk("getTeamGoalsByOrganizationId", async (id) => {
  try {
    const response = await axios.get(
      `${performanceManagementConfigUrl}/GetTeamGoalsByOrganizationalId?organizationalId=${id}`
    );
    console.log(">>>>respomse", response)
    if (response.status === 200) {
      return response.data;
    }
    return response.data;
  } catch (e) {
    return e.response.data
  }
});

const getTeamGoalsByOrganizationIdSlice = createSlice({
  name: "getTeamGoalsByOrganizationId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamGoalsByOrganizationId.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getTeamGoalsByOrganizationId.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getTeamGoalsByOrganizationId.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getTeamGoalsByOrganizationIdSlice.reducer;
