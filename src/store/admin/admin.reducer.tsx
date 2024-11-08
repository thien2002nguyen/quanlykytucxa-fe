import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAdminsAction,
  getDetailAdminAction,
  getAuthMeAdminAction,
} from "./admin.action";
import {
  AdminResponse,
  Admin,
  AdminsState,
  DetailAdminResponse,
  AuthMeAdminResponse,
} from "./admin.type";

const initialState: AdminsState = {
  dataAdmins: {
    data: [] as Admin[],
    loading: false,
    error: undefined,
  },

  dataDetailAdmin: {
    data: {} as Admin,
    loading: false,
    error: undefined,
  },

  dataAuthMeAdmin: {
    data: {} as Admin,
    loading: false,
    error: undefined,
  },
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get admins----------
    builder.addCase(getAdminsAction.pending, (state) => {
      state.dataAdmins = {
        ...state.dataAdmins,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getAdminsAction.fulfilled,
      (state, action: PayloadAction<AdminResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataAdmins = {
          ...state.dataAdmins,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getAdminsAction.rejected, (state, action) => {
      state.dataAdmins = {
        ...state.dataAdmins,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail admins----------
    builder.addCase(getDetailAdminAction.pending, (state) => {
      state.dataDetailAdmin = {
        ...state.dataDetailAdmin,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailAdminAction.fulfilled,
      (state, action: PayloadAction<DetailAdminResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailAdmin = {
          ...state.dataDetailAdmin,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailAdminAction.rejected, (state, action) => {
      state.dataDetailAdmin = {
        ...state.dataDetailAdmin,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get auth me admin----------
    builder.addCase(getAuthMeAdminAction.pending, (state) => {
      state.dataAuthMeAdmin = {
        ...state.dataAuthMeAdmin,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getAuthMeAdminAction.fulfilled,
      (state, action: PayloadAction<AuthMeAdminResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataAuthMeAdmin = {
          ...state.dataAuthMeAdmin,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getAuthMeAdminAction.rejected, (state, action) => {
      state.dataDetailAdmin = {
        ...state.dataDetailAdmin,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default adminsSlice.reducer;
