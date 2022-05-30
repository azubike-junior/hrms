import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const initialState = {
  openVendor: false,
  openDeleteVendor: false,
  openUpdateVendor: false,
  openRequest: false,
  openEditRequest: false,
  openDeleteRequest: false,
  openDeleteDocument: false,
  openAddDocument: false,
  openEditDocument: false,
  openAddDivision: false,
  openAddBranch: false,
  openAddDepartment: false,
  openAddUnit: false,
  openAddStaff: false,
  openUpdateBranch: false,
  openUpdateDepartment: false,
  openUpdateUnit: false,
  openUpdateDivision: false,
  openAddExpense: false,
  openDeleteExpense: false,
  openEditPerspective: false
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openVendorModal: (state) => {
      state.openVendor = true;
    },
    closeVendorModal: (state) => {
      state.openVendor = false;
    },
    toggleDeleteVendorModal: (state) => {
      state.openDeleteVendor = !state.openDeleteVendor;
    },
    toggleUpdateVendorModal: (state) => {
      state.openUpdateVendor = !state.openUpdateVendor;
    },
    toggleRequestModal: (state) => {
      state.openRequest = !state.openRequest;
    },
    toggleEditRequestModal: (state) => {
      state.openEditRequest = !state.openEditRequest;
    },
    toggleDeleteRequestModal: (state) => {
      state.openDeleteRequest = !state.openDeleteRequest;
    },
    toggleDeleteDocumentModal: (state) => {
      state.openDeleteDocument = !state.openDeleteDocument;
    },
    toggleAddDocumentModal: (state) => {
      state.openAddDocument = !state.openAddDocument;
    },
    toggleEditDocumentModal: (state) => {
      state.openEditDocument = !state.openEditDocument;
    },
    toggleAddDivisionModal: (state) => {
      state.openAddDivision = !state.openAddDivision;
    },
    toggleAddBranchModal: (state) => {
      state.openAddBranch = !state.openAddBranch;
    },
    toggleAddDepartmentModal: (state) => {
      state.openAddDepartment = !state.openAddDepartment;
    },
    toggleAddUnitModal: (state) => {
      state.openAddUnit = !state.openAddUnit;
    },
    toggleAddStaffModal: (state) => {
      state.openAddStaff = !state.openAddStaff;
    },
    toggleUpdateBranchModal: (state) => {
      state.openUpdateBranch = !state.openUpdateBranch;
    },
    toggleUpdateDepartmentModal: (state) => {
      state.openUpdateDepartment = !state.openUpdateDepartment;
    },
    toggleUpdateUnitModal: (state) => {
      state.openUpdateUnit = !state.openUpdateUnit;
    },
    toggleUpdateDivisionModal: (state) => {
      state.openUpdateDivision = !state.openUpdateDivision;
    },
    toggleAddExpenseModal: (state) => {
      state.openAddExpense = !state.openAddExpense;
    },
    toggleDeleteExpenseModal: (state) => {
      state.openDeleteExpense = !state.openDeleteExpense;
    },
    toggleEditPerspectiveModal: (state) => {
      state.openEditPerspective = !state.openEditPerspective
    },
  },
});

export const {
  openVendorModal,
  closeVendorModal,
  toggleDeleteVendorModal,
  toggleUpdateVendorModal,
  toggleRequestModal,
  toggleDeleteRequestModal,
  toggleEditRequestModal,
  toggleAddDocumentModal,
  toggleEditDocumentModal,
  toggleDeleteDocumentModal,
  toggleAddBranchModal,
  toggleAddDivisionModal,
  toggleAddUnitModal,
  toggleAddDepartmentModal,
  toggleAddStaffModal,
  toggleUpdateBranchModal,
  toggleUpdateDepartmentModal,
  toggleUpdateUnitModal,
  toggleUpdateDivisionModal,
  toggleAddExpenseModal,
  toggleDeleteExpenseModal,
  toggleEditPerspectiveModal
} = modalSlice.actions;
export default modalSlice.reducer;
