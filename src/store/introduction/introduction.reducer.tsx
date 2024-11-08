import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIntroductionAction } from "./introduction.action";
import {
  Introduction,
  IntroductionResponse,
  IntroductionState,
} from "./introduction.type";

const initialState: IntroductionState = {
  dataIntroduction: {
    data: {} as Introduction,
    loading: false,
    error: undefined,
  },
};

const introductionSlice = createSlice({
  name: "introductions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get introduction----------
    builder.addCase(getIntroductionAction.pending, (state) => {
      state.dataIntroduction = {
        ...state.dataIntroduction,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getIntroductionAction.fulfilled,
      (state, action: PayloadAction<IntroductionResponse>) => {
        state.dataIntroduction = {
          ...state.dataIntroduction,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getIntroductionAction.rejected, (state, action) => {
      state.dataIntroduction = {
        ...state.dataIntroduction,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default introductionSlice.reducer;
