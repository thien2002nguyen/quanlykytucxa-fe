import auth from "@/store/auth/auth.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterLogin } from "./auth.type";

const loginAction = createAsyncThunk(
  "auth/loginAction", // Tên action
  async (params: ParameterLogin, thunkAPI) => {
    try {
      // Gọi API để thực hiện đăng nhập
      const res = await auth.login(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Đăng nhập thất bại.",
      });
    }
  }
);

export { loginAction };
