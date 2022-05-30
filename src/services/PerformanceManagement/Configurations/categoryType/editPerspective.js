import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { toggleEditPerspectiveModal } from "../../../modals/modals";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";
import { getCategoryTypes } from "./getCategoryTypes";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const editPerspective = createAsyncThunk(
  "editPerspective",
  async ({ perspective, id, dispatch, reset }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/editPerspective?perspective=${perspective}&id=${id}`,
        { perspective, id }
      );
      console.log(response)
      if (response.data.responseCode === "00") {
        Swal.fire(`Perspective has been updated`, "success").then(() => {
          dispatch(getCategoryTypes());
          dispatch(toggleEditPerspectiveModal())
          reset();
        });
        return response.data;
      }
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const editPerspectiveSlice = createSlice({
  name: "editPerspectiveType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editPerspective.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(editPerspective.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(editPerspective.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default editPerspectiveSlice.reducer;
