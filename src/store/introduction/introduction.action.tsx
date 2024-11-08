import introductionsApi from "@/store/introduction/introduction.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPatchIntroduction } from "./introduction.type";

const getIntroductionAction = createAsyncThunk(
  "introduction/getIntroduction",
  async (_, thunkAPI) => {
    try {
      const res = await introductionsApi.getIntroduction();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const patchIntroductionAction = createAsyncThunk(
  "introduction/patchIntroductionAction",
  async (params: ParameterPatchIntroduction, thunkAPI) => {
    try {
      const res = await introductionsApi.patchIntroduction(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

export { getIntroductionAction, patchIntroductionAction };
