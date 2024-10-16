import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./admin.action";
import { AdminState } from "./admin.type";
import { LoginResponse } from "./admin.type"; // Import kiểu LoginResponse

const initialState: AdminState = {
  admin: {
    _id: "",
    fullName: "",
    createdAt: "",
    updatedAt: "",
    phoneNumber: "",
    email: "",
    avatar: "",
    role: null,
  },
  token: {
    expiresIn: 0,
    refreshExpiresIn: 0,
    accessToken: "",
    refreshToken: "",
  },
  loading: false,
  error: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout(state) {
      state.admin = initialState.admin;
      state.token = initialState.token;
      state.loading = false;
      state.error = initialState.error;
    },
  },

  extraReducers: (builder) => {
    //----------Login----------
    builder.addCase(loginAction.pending, (state) => {
      state.admin = initialState.admin;
      state.token = initialState.token;
      state.loading = true;
      state.error = initialState.error;
    });

    builder.addCase(
      loginAction.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        // Log payload ra console
        console.log("Payload from loginAction:", action.payload);

        const { data, token } = action.payload;

        // Cập nhật state với thông tin từ payload
        state.admin = {
          _id: data._id,
          fullName: data.fullName,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          phoneNumber: data.phoneNumber,
          email: data.email,
          avatar: data.avatar,
          role: data.role,
        };
        state.token = {
          expiresIn: token.expiresIn,
          refreshExpiresIn: token.refreshExpiresIn,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };

        state.loading = false;
        state.error = initialState.error;
      }
    );

    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Đăng nhập thất bại.";
    });
  },
});

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;
