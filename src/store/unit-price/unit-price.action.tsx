import unitPriceApi from "@/store/unit-price/unit-price.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPatchUnitPrice } from "./unit-price.type";

// Action để lấy dữ liệu đơn giá
const getUnitPriceAction = createAsyncThunk(
  "unitPrice/getUnitPrice",
  async (_, thunkAPI) => {
    try {
      const res = await unitPriceApi.getUnitPrice();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error?.response?.data?.message || "Lấy dữ liệu đơn giá thất bại.",
      });
    }
  }
);

// Action để cập nhật thông tin đơn giá
const patchUnitPriceAction = createAsyncThunk(
  "unitPrice/patchUnitPriceAction",
  async (params: ParameterPatchUnitPrice, thunkAPI) => {
    try {
      const res = await unitPriceApi.patchUnitPrice(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật đơn giá thất bại.",
      });
    }
  }
);

export { getUnitPriceAction, patchUnitPriceAction };
