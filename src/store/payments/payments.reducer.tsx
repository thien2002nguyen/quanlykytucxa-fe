import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPaymentsAction,
  getDetailPaymentAction,
  getPaymentsByUserAction,
} from "./payments.action";
import {
  PaymentsResponse,
  Payment,
  PaymentsState,
  DetailPaymentResponse,
} from "./payments.type";
import { MetaPagination } from "@/utils/contants";

const initialState: PaymentsState = {
  dataPayments: {
    data: [] as Payment[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataPaymentsByUser: {
    data: [] as Payment[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailPayment: {
    data: {} as Payment,
    loading: false,
    error: undefined,
  },
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get payments----------
    builder.addCase(getPaymentsAction.pending, (state) => {
      state.dataPayments = {
        ...state.dataPayments,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getPaymentsAction.fulfilled,
      (state, action: PayloadAction<PaymentsResponse>) => {
        state.dataPayments = {
          ...state.dataPayments,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getPaymentsAction.rejected, (state, action) => {
      state.dataPayments = {
        ...state.dataPayments,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get payments by user----------
    builder.addCase(getPaymentsByUserAction.pending, (state) => {
      state.dataPaymentsByUser = {
        ...state.dataPaymentsByUser,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getPaymentsByUserAction.fulfilled,
      (state, action: PayloadAction<PaymentsResponse>) => {
        state.dataPaymentsByUser = {
          ...state.dataPaymentsByUser,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getPaymentsByUserAction.rejected, (state, action) => {
      state.dataPaymentsByUser = {
        ...state.dataPaymentsByUser,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail payment----------
    builder.addCase(getDetailPaymentAction.pending, (state) => {
      state.dataDetailPayment = {
        ...state.dataDetailPayment,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailPaymentAction.fulfilled,
      (state, action: PayloadAction<DetailPaymentResponse>) => {
        state.dataDetailPayment = {
          ...state.dataDetailPayment,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailPaymentAction.rejected, (state, action) => {
      state.dataDetailPayment = {
        ...state.dataDetailPayment,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default paymentsSlice.reducer;
