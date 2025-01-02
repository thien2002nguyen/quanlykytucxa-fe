import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getContractsAction,
  getDetailContractAction,
} from "./contracts.action";
import {
  ContractsResponse,
  Contract,
  ContractsState,
  DetailContractResponse,
} from "./contracts.type";
import { MetaPagination } from "@/utils/contants";

const initialState: ContractsState = {
  dataContracts: {
    data: [] as Contract[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailContract: {
    data: {} as Contract,
    loading: false,
    error: undefined,
  },
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get contracts--------------
    builder.addCase(getContractsAction.pending, (state) => {
      state.dataContracts = {
        ...state.dataContracts,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getContractsAction.fulfilled,
      (state, action: PayloadAction<ContractsResponse>) => {
        state.dataContracts = {
          ...state.dataContracts,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getContractsAction.rejected, (state, action) => {
      state.dataContracts = {
        ...state.dataContracts,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    // -----------get detail contract--------------
    builder.addCase(getDetailContractAction.pending, (state) => {
      state.dataDetailContract = {
        ...state.dataDetailContract,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailContractAction.fulfilled,
      (state, action: PayloadAction<DetailContractResponse>) => {
        state.dataDetailContract = {
          ...state.dataDetailContract,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailContractAction.rejected, (state, action) => {
      state.dataDetailContract = {
        ...state.dataDetailContract,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default contractSlice.reducer;
