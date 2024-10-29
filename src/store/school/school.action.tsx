import schoolApi from "@/store/school/school.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPatchSchool } from "./school.type";

const getSchoolAction = createAsyncThunk(
  "school/getSchoolAction",
  async (_, thunkAPI) => {
    try {
      const res = await schoolApi.getSchool();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const patchSchoolAction = createAsyncThunk(
  "school/patchSchoolAction",
  async (params: ParameterPatchSchool, thunkAPI) => {
    try {
      const res = await schoolApi.patchSchool(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export { getSchoolAction, patchSchoolAction };
