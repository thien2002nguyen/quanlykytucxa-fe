import paymentsApi from "@/store/payments/payments.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterGetPayment,
  ParameterGetPaymentByUser,
} from "./payments.type";

// Action to create the list of payments
const createPaymentsAction = createAsyncThunk(
  "payments/createPayments",
  async (_, thunkAPI) => {
    try {
      const res = await paymentsApi.createPayments();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error?.response?.data?.message || "Tạo hóa đơn thanh toán thất bại.",
      });
    }
  }
);

// Action to get the list of payments
const getPaymentsAction = createAsyncThunk(
  "payments/getPayments",
  async (params: ParameterGetPayment, thunkAPI) => {
    try {
      const res = await paymentsApi.getPayments(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Action to get the list of payments
const getPaymentsByUserAction = createAsyncThunk(
  "payments/getPaymentsByUser",
  async (params: ParameterGetPaymentByUser, thunkAPI) => {
    try {
      const res = await paymentsApi.getPaymentsByUser(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Action to get the details of a specific payment
const getDetailPaymentAction = createAsyncThunk(
  "payments/getDetailPayment",
  async (id: string, thunkAPI) => {
    try {
      const res = await paymentsApi.getDetailPayment(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

export {
  createPaymentsAction,
  getPaymentsAction,
  getPaymentsByUserAction,
  getDetailPaymentAction,
};
