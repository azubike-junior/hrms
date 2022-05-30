import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getCategoryTypes } from "./getCategoryTypes";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteCategoryType = createAsyncThunk(
  "deleteCategoryType",
  async ({ categoryId, dispatch }, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${performanceManagementConfigUrl}/categoryTypes/${categoryId}`
      );
      if (response.status === 200) {
        dispatch(getCategoryTypes());

        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deleteCategoryTypeSlice = createSlice({
  name: "deleteCategoryType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCategoryType.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteCategoryType.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteCategoryType.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default deleteCategoryTypeSlice.reducer;
