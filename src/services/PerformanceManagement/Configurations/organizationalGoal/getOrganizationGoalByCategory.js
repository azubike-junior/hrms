import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../../utils/helper";
// import { configUrl } from "../../../utils/helper";
// import { closeVendorModal } from "../../modals/modals";
// import { getVendors } from "./getVendors";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getOrganizationalGoalsByCategory = createAsyncThunk(
  "getOrganizationalGoalsByCategory",
  async (id) => {
    try {
      const response = await axios.get(
        `${performanceManagementConfigUrl}/OrganizationalGoalsByCategoryId?categoryId=${id}`
      );
      console.log("<<<<<response", response);
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

const getOrganizationalGoalsByCategorySlice = createSlice({
  name: "getOrganizationalGoalsByCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrganizationalGoalsByCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getOrganizationalGoalsByCategory.fulfilled, (state, action) => {
      // dispatch(getVendors());
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getOrganizationalGoalsByCategory.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default getOrganizationalGoalsByCategorySlice.reducer;
