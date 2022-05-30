import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { performanceManagementConfigUrl } from './../../../../utils/helper';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getAllStaffs = createAsyncThunk(
  "getStaffs",
  async () => {
      console.log("got here ooo");

    try {
      const response = await axios.get(
        `http://10.11.200.97/PerformanceManagement/Configuration/GetAllStaffs`
      );

      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data
    }
  }
);

const getAllStaffsSlice = createSlice({
  name: "getStaffs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStaffs.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAllStaffs.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getAllStaffs.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getAllStaffsSlice.reducer;
