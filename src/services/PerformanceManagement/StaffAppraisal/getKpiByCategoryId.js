import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { performanceManagementConfigUrl } from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getKpiByCategoryId = createAsyncThunk(
  "getKpiByCategoryId",
  async (id, setAllKPIs, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${performanceManagementConfigUrl}/getKpiByCategoryId?categoryId=${id.categoryId}`
      );
      
      if (response.status === 200) {
        return response.data;
      }
      setAllKPIs(response.data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const getKpiByCategoryIdSlice = createSlice({
  name: "getKpiByCategoryId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKpiByCategoryId.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getKpiByCategoryId.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getKpiByCategoryId.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getKpiByCategoryIdSlice.reducer;
