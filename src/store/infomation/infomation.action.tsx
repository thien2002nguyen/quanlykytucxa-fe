import infomationApi from "@/store/infomation/infomation.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterPostInfomation,
  ParameterPutInfomation,
} from "./infomation.type";
import { ParameterGet } from "@/utils/contants";

const getInfomationsAction = createAsyncThunk(
  "infomation/getInfomation",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await infomationApi.getInfomations(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postInfomationAction = createAsyncThunk(
  "infomation/postInfomation",
  async (params: ParameterPostInfomation, thunkAPI) => {
    try {
      const res = await infomationApi.postInfomation(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailInfomationAction = createAsyncThunk(
  "infomation/getDetailInfomation",
  async (idOrSlug: string, thunkAPI) => {
    try {
      const res = await infomationApi.getDetailInfomation(idOrSlug);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putInfomationAction = createAsyncThunk(
  "infomation/putInfomation",
  async (params: ParameterPutInfomation, thunkAPI) => {
    try {
      const res = await infomationApi.putInfomation(params);
      return {
        res,
        id: params.id,
        isActive: params.isActive,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteInfomationAction = createAsyncThunk(
  "infomation/deleteInfomation",
  async (id: string, thunkAPI) => {
    try {
      const res = await infomationApi.deleteInfomation(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getInfomationsAction,
  postInfomationAction,
  getDetailInfomationAction,
  putInfomationAction,
  deleteInfomationAction,
};
