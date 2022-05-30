import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl, performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getCategoryTypes } from "./getCategoryTypes";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const addCategoryType = createAsyncThunk(
  "addCategoryType",
  async ({ data, reset, dispatch }, { rejectWithValue }) => {
    const { categoryType } = data;

    // console.log(">>>>>cat", categoryType)

    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/SubmitCategoryType?categoryType=${categoryType}`
      );
      // console.log(">>>>response", response);
      if (response.status === 200) {
        Swal.fire(`CategoryType has been added`, "Successful!", "success").then(
          () => {
            dispatch(getCategoryTypes());
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

const addCategoryTypeSlice = createSlice({
  name: "addCategoryType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCategoryType.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addCategoryType.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addCategoryType.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default addCategoryTypeSlice.reducer;
