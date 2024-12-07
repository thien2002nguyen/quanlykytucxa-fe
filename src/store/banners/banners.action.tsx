import bannersApi from "@/store/banners/banners.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterPatchBanner,
  ParameterPostBanner,
  ParameterPutBanner,
} from "./banners.type";

const getBannersAction = createAsyncThunk(
  "banners/getBanners",
  async (params: { isClient?: boolean }, thunkAPI) => {
    try {
      const res = await bannersApi.getBanners(params);
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
      const res = await bannersApi.postBanner(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailBannerAction = createAsyncThunk(
  "banners/getDetailBannerAction",
  async (id: string, thunkAPI) => {
    try {
      const res = await bannersApi.getDetailBanner(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putBannerAction = createAsyncThunk(
  "banners/putBannerAction",
  async (params: ParameterPutBanner, thunkAPI) => {
    try {
      const res = await bannersApi.putBanner(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteBannerAction = createAsyncThunk(
  "banners/deleteBannerAction",
  async (id: string, thunkAPI) => {
    try {
      const res = await bannersApi.deleteBanner(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

const patchMultiActiveBannerAction = createAsyncThunk(
  "banners/patchMultiActiveBannerAction",
  async (params: ParameterPatchBanner, thunkAPI) => {
    try {
      const res = await bannersApi.patchMultiActiveBanner(params);
      return {
        res,
        bannerIds: params.bannerIds,
        isActive: params.isActive,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error?.response?.data?.message || "Thay đổi trạng thái thất bại.",
      });
    }
  }
);

export {
  getBannersAction,
  postBannersAction,
  getDetailBannerAction,
  putBannerAction,
  deleteBannerAction,
  patchMultiActiveBannerAction,
};
