import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../../utils/helper";
// import { configUrl } from "../../../utils/helper";
// import { closeVendorModal } from "../../modals/modals";
// import { getVendors } from "./getVendors";
import { performanceManagementConfigUrl } from './../../../../utils/helper';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getOrganizationalGoal = createAsyncThunk(
  "getOrganizationalGoal",
  async () => {
    try {
      const response = await axios.get(
        `${performanceManagementConfigUrl}/GetAllOrganizationalGoals`
      );
      console.log("<<<<<response", response);
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const getOrganizationalGoalSlice = createSlice({
  name: "getOrganizationalGoal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizationalGoal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getOrganizationalGoal.fulfilled, (state, action) => {
      // dispatch(getVendors());
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getOrganizationalGoal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getOrganizationalGoalSlice.reducer;
