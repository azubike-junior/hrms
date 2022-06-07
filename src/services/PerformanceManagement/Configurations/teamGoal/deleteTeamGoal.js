import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getTeamGoals } from './getTeamGoals';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteTeamGoal = createAsyncThunk(
  "deleteTeamGoal",
  async ({ teamGoalId, dispatch, toggleModal }, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/DeleteTeamGoal/id?Id=${teamGoalId}`
      );
      if (response.data.responseCode === "00") {
        dispatch(getTeamGoals());
        toggleModal()
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteTeamGoalSlice = createSlice({
  name: "deleteTeamGoal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTeamGoal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteTeamGoal.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteTeamGoal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteTeamGoalSlice.reducer;
