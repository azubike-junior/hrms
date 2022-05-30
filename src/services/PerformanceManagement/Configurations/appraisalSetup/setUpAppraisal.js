import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../../utils/helper";
// import { toggleAddDocumentModal } from "../../modals/modals";
// import { getDocuments } from "./getDocuments";
import { performanceManagementConfigUrl } from "./../../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: {},
  isSuccessful: false,
};

export const setupAppraisal = createAsyncThunk(
  "setupAppraisal",
  async (newData, { rejectWithValue }) => {
    const { reset, ...rest } = newData;
    // console.log("++++++", rest);

    try {
      const response = await axios.post(
        `${performanceManagementConfigUrl}/SetUpAppraisal`,
        rest
      );
      console.log(">>>>>response", response);
      // if(response.data.reponse)
      if (response.data.responseCode === "00") {
        Swal.fire(
          `Appraisal has been ${newData.status}`,
          "Successful!",
          "success"
        ).then(() => {
          reset();
        });
        return response.data;
      }

      if (response.data.responseCode === "97") {
        Swal.fire(
          `${response.data.responseMessage}`,
          "UNSUCCESSFUL",
          "error"
        ).then(() => {
          reset();
        });
        return response.data;
      }

      if (response.data.responseCode === "96") {
        Swal.fire(
          `Sorry, an Error ocurred`,
          "Error!",
          "error"
        ).then(() => {
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

const setupAppraisalSlice = createSlice({
  name: "addDocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setupAppraisal.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(setupAppraisal.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(setupAppraisal.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default setupAppraisalSlice.reducer;
