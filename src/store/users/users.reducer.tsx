import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUsersAction,
  getDetailUserAction,
  getAuthMeUserAction,
  putUserAction,
  verifyOtpAction,
} from "./users.action";
import {
  UserResponse,
  User,
  UsersState,
  DetailUserResponse,
  AuthMeUserResponse,
  VerifyOtp,
} from "./users.type";
import { MetaPagination } from "@/utils/contants";

const initialState: UsersState = {
  dataUsers: {
    data: [] as User[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailUser: {
    data: {} as User,
    loading: false,
    error: undefined,
  },

  dataAuthMeUser: {
    data: {} as User,
    loading: false,
    error: undefined,
  },

  dataVerifyOtp: {
    data: {} as VerifyOtp,
    loading: false,
    error: undefined,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get users----------
    builder.addCase(getUsersAction.pending, (state) => {
      state.dataUsers = {
        ...state.dataUsers,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getUsersAction.fulfilled,
      (state, action: PayloadAction<UserResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataUsers = {
          ...state.dataUsers,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getUsersAction.rejected, (state, action) => {
      state.dataUsers = {
        ...state.dataUsers,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail user----------
    builder.addCase(getDetailUserAction.pending, (state) => {
      state.dataDetailUser = {
        ...state.dataDetailUser,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailUserAction.fulfilled,
      (state, action: PayloadAction<DetailUserResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailUser = {
          ...state.dataDetailUser,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailUserAction.rejected, (state, action) => {
      state.dataDetailUser = {
        ...state.dataDetailUser,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get auth me user----------
    builder.addCase(getAuthMeUserAction.pending, (state) => {
      state.dataAuthMeUser = {
        ...state.dataAuthMeUser,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getAuthMeUserAction.fulfilled,
      (state, action: PayloadAction<AuthMeUserResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataAuthMeUser = {
          ...state.dataAuthMeUser,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getAuthMeUserAction.rejected, (state, action) => {
      state.dataAuthMeUser = {
        ...state.dataAuthMeUser,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------update user----------
    builder.addCase(putUserAction.pending, (state) => {
      state.dataUsers = {
        ...state.dataUsers,
        loading: false,
        error: undefined,
      };
    });

    builder.addCase(
      putUserAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataUsers = {
          ...state.dataUsers,
          data: state.dataUsers.data?.map((item) => {
            if (item._id === action.payload.id) {
              return {
                ...item,
                isBlocked: action.payload.isBlocked,
              };
            }

            return item;
          }),
          loading: false,
          error: undefined,
        };
      }
    );

    //----------verify otp user----------
    builder.addCase(verifyOtpAction.pending, (state) => {
      state.dataVerifyOtp = {
        ...state.dataVerifyOtp,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      verifyOtpAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataVerifyOtp = {
          ...state.dataVerifyOtp,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(verifyOtpAction.rejected, (state, action) => {
      state.dataVerifyOtp = {
        ...state.dataVerifyOtp,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default usersSlice.reducer;
