import adminsApi from "@/store/admin/admin.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostAdmin, ParameterPutAdmin } from "./admin.type";
import { ParameterGet } from "@/utils/contants";

const getAdminsAction = createAsyncThunk(
  "admins/getAdmins",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await adminsApi.getAdmins(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postAdminAction = createAsyncThunk(
  "admins/postAdmin",
  async (params: ParameterPostAdmin, thunkAPI) => {
    try {
      const res = await adminsApi.postAdmin(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailAdminAction = createAsyncThunk(
  "admins/getDetailAdmin",
  async (id: string, thunkAPI) => {
    try {
      const res = await adminsApi.getDetailAdmin(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putAdminAction = createAsyncThunk(
  "admins/putAdmin",
  async (params: ParameterPutAdmin, thunkAPI) => {
    try {
      const res = await adminsApi.putAdmin(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteAdminAction = createAsyncThunk(
  "admins/deleteAdmin",
  async (id: string, thunkAPI) => {
    try {
      const res = await adminsApi.deleteAdmin(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

const getAuthMeAdminAction = createAsyncThunk(
  "admins/getAuthMeAdmin",
  async (_, thunkAPI) => {
    try {
      const res = await adminsApi.getAuthMeAdmin();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

export {
  getAdminsAction,
  postAdminAction,
  getDetailAdminAction,
  putAdminAction,
  deleteAdminAction,
  getAuthMeAdminAction,
};
