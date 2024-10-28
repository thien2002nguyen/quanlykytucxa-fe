import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getVisitsByYearAction } from "./monthly-visits.action";
import {
  MonthlyVisit,
  MonthlyVisitState,
  YearlyVisitsResponse,
} from "./monthly-visits.type";

const initialState: MonthlyVisitState = {
  dataMonthlyVisit: {
    data: [] as MonthlyVisit[],
    totalVisits: 0,
    loading: false,
    error: undefined,
  },
};

const monthlyVisitSlice = createSlice({
  name: "monthlyVisit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get monthly visits----------
    builder.addCase(getVisitsByYearAction.pending, (state) => {
      state.dataMonthlyVisit = {
        ...state.dataMonthlyVisit,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getVisitsByYearAction.fulfilled,
      (state, action: PayloadAction<YearlyVisitsResponse>) => {
        state.dataMonthlyVisit = {
          data: action.payload.data,
          totalVisits: action.payload.totalVisits,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getVisitsByYearAction.rejected, (state, action) => {
      state.dataMonthlyVisit = {
        ...state.dataMonthlyVisit,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default monthlyVisitSlice.reducer;
