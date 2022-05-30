import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementUrl } from "./../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ allData, history }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${performanceManagementUrl}/addStaff`,
        allData
      );
      console.log(">>>>>response", response);
      if (response.data.responseCode === "00") {
        Swal.fire("Profile has been updated", "Successful!", "success").then(
          (result) => {
            if (result.isConfirmed) {
              history.push("/hrms/appraisals");
              localStorage.setItem("jobFunctionId", response.data.jobFunctionId)
              localStorage.removeItem("responseStatus")
            }
          }
        );
      }
      //   if (response.data.responseCode === "00") {
      //     Swal.fire("Expense raised successfully", "Successful!", "success").then(
      //       (result) => {
      //         if (result.isConfirmed) {
      //           dispatch(toggleAddExpenseModal());
      //           dispatch(getAllExpenseByStaffId(330));
      //           reset();
      //         }
      //       }
      //     );
      //     return response.data;
      //   }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const updateProfileSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default updateProfileSlice.reducer;
