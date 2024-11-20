import servicesApi from "@/store/services/services.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostService, ParameterPutService } from "./services.type";

const getServicesAction = createAsyncThunk(
  "services/getServices",
  async (_, thunkAPI) => {
    try {
      const res = await servicesApi.getServices();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postServiceAction = createAsyncThunk(
  "services/postService",
  async (params: ParameterPostService, thunkAPI) => {
    try {
      const res = await servicesApi.postService(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailServiceAction = createAsyncThunk(
  "services/getDetailService",
  async (id: string, thunkAPI) => {
    try {
      const res = await servicesApi.getDetailService(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putServiceAction = createAsyncThunk(
  "services/putService",
  async (params: ParameterPutService, thunkAPI) => {
    try {
      const res = await servicesApi.putService(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteServiceAction = createAsyncThunk(
  "services/deleteService",
  async (id: string, thunkAPI) => {
    try {
      const res = await servicesApi.deleteService(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getServicesAction,
  postServiceAction,
  getDetailServiceAction,
  putServiceAction,
  deleteServiceAction,
};
