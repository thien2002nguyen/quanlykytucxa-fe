import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./auth.action";
import { AuthState } from "./auth.type";
import { LoginResponse } from "./auth.type";

const initialState: AuthState = {
  user: {
    _id: "",
    userName: "",
    phoneNumber: "",
    email: "",
    avatar: "",
    role: null,
  },
  token: {
    accessToken: "",
    refreshToken: "",
    refreshExpiresIn: 0,
  },
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.loading = false;
      state.error = initialState.error;
    },
  },

  extraReducers: (builder) => {
    //----------Login----------
    builder.addCase(loginAction.pending, (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      state.loading = true;
      state.error = initialState.error;
    });

    builder.addCase(
      loginAction.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        const { data, token } = action.payload;

        // Cập nhật state với thông tin từ payload
        state.user = {
          _id: data._id,
          userName: data.userName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          avatar: data.avatar,
          role: data.role,
        };
        state.token = {
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
