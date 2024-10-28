import admin from "@/store/auth-admin/auth-admin.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParamLogin } from "./auth-admin.type";

const loginAction = createAsyncThunk(
  "admin/loginAction", // Tên action
  async (params: ParamLogin, thunkAPI) => {
    try {
      // Gọi API để thực hiện đăng nhập
      const res = await admin.login(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Đăng nhập thất bại.",
      });
    }
  }
);

export { loginAction };
