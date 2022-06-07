import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getOrganizationalGoal } from './getOrganizationalGoal';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteOrganizationalGoal = createAsyncThunk(
  "deleteOrganizationalGoal",
  async ({ organizationalGoalId, dispatch, toggleModal }, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/deleteOrganizationalGoal/id?Id=${organizationalGoalId}`
      );

      if (response.data.responseCode === "00") {
        dispatch(getOrganizationalGoal());
        toggleModal()
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteOrganizationalGoalSlice = createSlice({
  name: "deleteOrganizationalGoal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteOrganizationalGoal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteOrganizationalGoal.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteOrganizationalGoal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteOrganizationalGoalSlice.reducer;
