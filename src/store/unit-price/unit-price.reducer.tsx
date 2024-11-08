import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUnitPriceAction, patchUnitPriceAction } from "./unit-price.action";
import {
  UnitPrice,
  UnitPriceResponse,
  UnitPriceState,
} from "./unit-price.type";

const initialState: UnitPriceState = {
  dataUnitPrice: {
    data: {} as UnitPrice,
    loading: false,
    error: undefined,
  },
};

const unitPriceSlice = createSlice({
  name: "unitPrices", // Đặt tên slice cho đơn giá
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get unit price----------
    builder.addCase(getUnitPriceAction.pending, (state) => {
      state.dataUnitPrice = {
        ...state.dataUnitPrice,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getUnitPriceAction.fulfilled,
      (state, action: PayloadAction<UnitPriceResponse>) => {
        state.dataUnitPrice = {
          ...state.dataUnitPrice,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getUnitPriceAction.rejected, (state, action) => {
      state.dataUnitPrice = {
        ...state.dataUnitPrice,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------patch unit price----------
    builder.addCase(patchUnitPriceAction.pending, (state) => {
      state.dataUnitPrice = {
        ...state.dataUnitPrice,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      patchUnitPriceAction.fulfilled,
      (state, action: PayloadAction<UnitPriceResponse>) => {
        state.dataUnitPrice = {
          ...state.dataUnitPrice,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(patchUnitPriceAction.rejected, (state, action) => {
      state.dataUnitPrice = {
        ...state.dataUnitPrice,
        loading: false,
        error: action.error.message || "Cập nhật dữ liệu thất bại.",
      };
    });
  },
});

export default unitPriceSlice.reducer;
