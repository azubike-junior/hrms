import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../../utils/helper";
// import { configUrl } from "../../../utils/helper";
// import { closeVendorModal } from "../../modals/modals";
// import { getVendors } from "./getVendors";
import { getOrganizationalGoal } from './getOrganizationalGoal';
import { performanceManagementConfigUrl } from './../../../../utils/helper';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addOrganizationalGoal = createAsyncThunk(
  "addOrganizationalGoal",
  async ({ data, dispatch, reset }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/SubmitOrganizationalGoal`,
        data
      );
      console.log("<<<<<response", response);
      if (response.status === 200) {
        Swal.fire("Organizational Goal has been added", "Successful!", "success").then(
          (result) => {
            if (result.isConfirmed) {
              dispatch(getOrganizationalGoal());
              reset();
            }
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

const addOrganizationalGoalSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrganizationalGoal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addOrganizationalGoal.fulfilled, (state, action) => {
      // dispatch(getVendors());
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addOrganizationalGoal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addOrganizationalGoalSlice.reducer;
