import roomBlocksApi from "@/store/room-blocks/room-blocks.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterPostRoomBlock,
  ParameterPutRoomBlock,
} from "./room-blocks.type";

const getRoomBlocksAction = createAsyncThunk(
  "roomBlocks/getRoomBlocks",
  async (_, thunkAPI) => {
    try {
      const res = await roomBlocksApi.getRoomBlocks();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postRoomBlockAction = createAsyncThunk(
  "roomBlocks/postRoomBlock",
  async (params: ParameterPostRoomBlock, thunkAPI) => {
    try {
      const res = await roomBlocksApi.postRoomBlock(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailRoomBlockAction = createAsyncThunk(
  "roomBlocks/getDetailRoomBlock",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomBlocksApi.getDetailRoomBlock(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putRoomBlockAction = createAsyncThunk(
  "roomBlocks/putRoomBlock",
  async (params: ParameterPutRoomBlock, thunkAPI) => {
    try {
      const res = await roomBlocksApi.putRoomBlock(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteRoomBlockAction = createAsyncThunk(
  "roomBlocks/deleteRoomBlock",
  async (id: string, thunkAPI) => {
    try {
      const res = await roomBlocksApi.deleteRoomBlock(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getRoomBlocksAction,
  postRoomBlockAction,
  getDetailRoomBlockAction,
  putRoomBlockAction,
  deleteRoomBlockAction,
};
