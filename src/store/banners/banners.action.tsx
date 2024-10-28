import bannersApi from "@/store/banners/banners.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostBanner } from "./banners.type";

const getBannersAction = createAsyncThunk(
  "banners/getBanners",
  async (_, thunkAPI) => {
    try {
      const res = await bannersApi.getBanners();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postBannersAction = createAsyncThunk(
  "banners/postBanners",
  async (params: ParameterPostBanner, thunkAPI) => {
    try {
      const res = await bannersApi.postBanners(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

export { getBannersAction, postBannersAction };
