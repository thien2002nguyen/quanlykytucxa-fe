import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getServicesAction, getDetailServiceAction } from "./services.action";
import {
  ServicesResponse,
  Service,
  ServicesState,
  DetailServiceResponse,
} from "./services.type";

const initialState: ServicesState = {
  dataServices: {
    data: [] as Service[],
    loading: false,
    error: undefined,
  },

  dataDetailService: {
    data: {} as Service,
    loading: false,
    error: undefined,
  },
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get services----------
    builder.addCase(getServicesAction.pending, (state) => {
      state.dataServices = {
        ...state.dataServices,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getServicesAction.fulfilled,
      (state, action: PayloadAction<ServicesResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataServices = {
          ...state.dataServices,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getServicesAction.rejected, (state, action) => {
      state.dataServices = {
        ...state.dataServices,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail service----------
    builder.addCase(getDetailServiceAction.pending, (state) => {
      state.dataDetailService = {
        ...state.dataDetailService,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailServiceAction.fulfilled,
      (state, action: PayloadAction<DetailServiceResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailService = {
          ...state.dataDetailService,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailServiceAction.rejected, (state, action) => {
      state.dataDetailService = {
        ...state.dataDetailService,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default servicesSlice.reducer;
