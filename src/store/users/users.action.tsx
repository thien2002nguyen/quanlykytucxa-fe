import usersApi from "@/store/users/users.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterGetUser,
  ParameterPostUser,
  ParameterPutUser,
  ParameterRegister,
} from "./users.type";

const registerAction = createAsyncThunk(
  "users/register",
  async (params: ParameterRegister, thunkAPI) => {
    try {
      const res = await usersApi.register(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Đăng ký tài khoản thất bại.",
      });
    }
  }
);

const postUserAction = createAsyncThunk(
  "users/postUser",
  async (params: ParameterPostUser, thunkAPI) => {
    try {
      const res = await usersApi.postUser(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getUsersAction = createAsyncThunk(
  "users/getUsers",
  async (params: ParameterGetUser, thunkAPI) => {
    try {
      const res = await usersApi.getUsers(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const getDetailUserAction = createAsyncThunk(
  "users/getDetailUser",
  async (id: string, thunkAPI) => {
    try {
      const res = await usersApi.getDetailUser(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putUserAction = createAsyncThunk(
  "users/putUser",
  async (params: ParameterPutUser, thunkAPI) => {
    try {
      const res = await usersApi.putUser(params);
      return {
        res,
        id: params.id,
        isBlocked: params.isBlocked,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteUserAction = createAsyncThunk(
  "users/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      const res = await usersApi.deleteUser(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

const getAuthMeUserAction = createAsyncThunk(
  "users/getAuthMeUser",
  async (_, thunkAPI) => {
    try {
      const res = await usersApi.getAuthMeUser();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

export {
  registerAction,
  postUserAction,
  getUsersAction,
  getDetailUserAction,
  putUserAction,
  deleteUserAction,
  getAuthMeUserAction,
};
