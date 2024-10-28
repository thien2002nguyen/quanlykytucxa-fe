import monthlyVisitsApi from "@/store/monthly-visits/monthly-visits.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getVisitsByYearAction = createAsyncThunk(
  "monthlyVisits/getVisitsByYear",
  async (year: number, thunkAPI) => {
    try {
      const res = await monthlyVisitsApi.getVisitsByYear(year);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const incrementMonthlyVisitsAction = createAsyncThunk(
  "monthlyVisits/incrementMonthlyVisits",
  async (_, thunkAPI) => {
    try {
      const res = await monthlyVisitsApi.incrementMonthlyVisits();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error?.response?.data?.message || "Cập nhật lượt truy cập thất bại.",
      });
    }
  }
);

export { getVisitsByYearAction, incrementMonthlyVisitsAction };
