import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

const initialState = {
  error: "",
  error2: "",
  isSuccessful: false,
  loading: false,
  response: {},
};

export const login = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    const { email, password, history } = data;
    try {
      const response = await axios.post(
        `http://10.11.200.97/PerformanceManagement/Login?userName=${email}&password=${password}`,
        data
      );
      if (response.status === 206) {
        console.log(">>>>>>>response from 206", response);
        localStorage.setItem("cachedData", JSON.stringify(response.data));
        localStorage.setItem("firstload", "true");
        localStorage.setItem("responseStatus", response.status);
        localStorage.setItem("success", "success");
        localStorage.setItem("jobFunctionId", 0);
        localStorage.setItem("role", "initiator");
        history.push("/hrms/Appraisals");
        return response;
      }
      if (response.status === 200) {
        console.log(">>>>>>>response from 200", response);
        localStorage.setItem("cachedData", JSON.stringify(response.data));
        localStorage.setItem("success", "success");
        localStorage.setItem(
          "photoPath",
          JSON.stringify(response.data.photoPath)
        );
        localStorage.setItem("jobFunctionId", response.data.jobFunctionId);
        history.push("/hrms/Appraisals");
        localStorage.setItem("firstload", "true");
        return response;
      } else {
        return response.data;
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = true;
      state.response = action.payload;
      state.loading = false;
      if (action.payload.data.staffRoleOnPerformanceMgmt === "INITIATOR") {
        localStorage.setItem("role", "initiator");
      }
      if (
        action.payload.data.staffRoleOnPerformanceMgmt === "APPROVER-SUPERVISOR"
      ) {
        localStorage.setItem("role", "approver");
      }
      if (action.payload.data.staffRoleOnPerformanceMgmt === "HR-ADMIN") {
        localStorage.setItem("role", "hrAdmin");
      }
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { handleNext, handlePrevious, setPage, openShow, closeShow } =
//   NextAndPreviousHandler.actions;
export default loginSlice.reducer;
