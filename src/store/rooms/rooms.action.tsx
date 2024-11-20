import roomsApi from "@/store/rooms/rooms.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostRoom, ParameterPutRoom } from "./rooms.type";
import { ParameterGet } from "@/utils/contants";

// Lấy danh sách phòng
const getRoomsAction = createAsyncThunk(
  "rooms/getRooms",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await roomsApi.getRooms(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Tạo phòng mới
const postRoomAction = createAsyncThunk(
  "rooms/postRoom",
  async (params: ParameterPostRoom, thunkAPI) => {
    try {
      const res = await roomsApi.postRoom(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

// Lấy chi tiết phòng theo ID
const getDetailRoomAction = createAsyncThunk(
  "rooms/getDetailRoom",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomsApi.getDetailRoom(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Cập nhật thông tin phòng
const putRoomAction = createAsyncThunk(
  "rooms/putRoom",
  async (params: ParameterPutRoom, thunkAPI) => {
    try {
      const res = await roomsApi.putRoom(params);
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

// Xóa phòng theo ID
const deleteRoomAction = createAsyncThunk(
  "rooms/deleteRoom",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomsApi.deleteRoom(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getRoomsAction,
  postRoomAction,
  getDetailRoomAction,
  putRoomAction,
  deleteRoomAction,
};
