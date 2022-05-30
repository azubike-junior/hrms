import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
// import { toggleAddDocumentModal } from "../../modals/modals";
// import { getDocuments } from "./getDocuments";
import { getTeamGoals } from "./getTeamGoals";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addTeamGoal = createAsyncThunk(
  "addTeamGoal",
  async ({ data, reset, dispatch }, { rejectWithValue }) => {
    console.log(">>>>data", data)
    try {
     const response = await axios.post(
        `${performanceManagementConfigUrl}/SubmitTeamGoal`,
        data
      );
      console.log(">>>>>>respomsne", response)
      if (response.status === 200) {
        Swal.fire(`Team Goal has been added`, "Successful!", "success").then(
          () => {
            dispatch(getTeamGoals());
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

const teamGoalSlice = createSlice({
  name: "addTeamGoal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTeamGoal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addTeamGoal.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addTeamGoal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default teamGoalSlice.reducer;
