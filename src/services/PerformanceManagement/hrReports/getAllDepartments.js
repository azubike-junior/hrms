import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementUrl } from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getAllDepartments = createAsyncThunk(
  "getDepartments",
  async () => {
    try {
      const response = await axios.get(
        `${performanceManagementUrl}/getDepartments`
      );

      console.log(">>>>>repsone", response);

      if (response.status === 200) {
        return response.data;
      }
      // setAllKPIs(response.data);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const getDepartmentsSlice = createSlice({
  name: "getDepartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDepartments.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getAllDepartments.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getDepartmentsSlice.reducer;
