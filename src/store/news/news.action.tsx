import newsApi from "@/store/news/news.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostNews, ParameterPutNews } from "./news.type";
import { ParameterGet } from "@/utils/contants";

const getNewsAction = createAsyncThunk(
  "news/getNews",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await newsApi.getNews(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postNewsAction = createAsyncThunk(
  "news/postNews",
  async (params: ParameterPostNews, thunkAPI) => {
    try {
      const res = await newsApi.postNews(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailNewsAction = createAsyncThunk(
  "news/getDetailNews",
  async (idOrSlug: string, thunkAPI) => {
    try {
      const res = await newsApi.getDetailNews(idOrSlug);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putNewsAction = createAsyncThunk(
  "news/putNews",
  async (params: ParameterPutNews, thunkAPI) => {
    try {
      const res = await newsApi.putNews(params);
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

const deleteNewsAction = createAsyncThunk(
  "news/deleteNews",
  async (id: string, thunkAPI) => {
    try {
      const res = await newsApi.deleteNews(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getNewsAction,
  postNewsAction,
  getDetailNewsAction,
  putNewsAction,
  deleteNewsAction,
};
