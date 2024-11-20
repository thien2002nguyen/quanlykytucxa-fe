import roomTypesApi from "@/store/room-types/room-types.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostRoomType, ParameterPutRoomType } from "./room-types.type";

const getRoomTypesAction = createAsyncThunk(
  "roomTypes/getRoomTypes",
  async (_, thunkAPI) => {
    try {
      const res = await roomTypesApi.getRoomTypes();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postRoomTypeAction = createAsyncThunk(
  "roomTypes/postRoomType",
  async (params: ParameterPostRoomType, thunkAPI) => {
    try {
      const res = await roomTypesApi.postRoomType(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailRoomTypeAction = createAsyncThunk(
  "roomTypes/getDetailRoomType",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomTypesApi.getDetailRoomType(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putRoomTypeAction = createAsyncThunk(
  "roomTypes/putRoomType",
  async (params: ParameterPutRoomType, thunkAPI) => {
    try {
      const res = await roomTypesApi.putRoomType(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteRoomTypeAction = createAsyncThunk(
  "roomTypes/deleteRoomType",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomTypesApi.deleteRoomType(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getRoomTypesAction,
  postRoomTypeAction,
  getDetailRoomTypeAction,
  putRoomTypeAction,
  deleteRoomTypeAction,
};
