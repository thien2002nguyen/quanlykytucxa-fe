import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getContractTypesAction,
  getDetailContractTypeAction,
} from "./contract-types.action";
import {
  ContractTypesResponse,
  ContractType,
  ContractTypesState,
  DetailContractTypeResponse,
} from "./contract-types.type";

const initialState: ContractTypesState = {
  dataContractTypes: {
    data: [] as ContractType[],
    loading: false,
    error: undefined,
  },

  dataDetailContractType: {
    data: {} as ContractType,
    loading: false,
    error: undefined,
  },
};

const contractTypeSlice = createSlice({
  name: "contractType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContractTypesAction.pending, (state) => {
      state.dataContractTypes = {
        ...state.dataContractTypes,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getContractTypesAction.fulfilled,
      (state, action: PayloadAction<ContractTypesResponse>) => {
        state.dataContractTypes = {
          ...state.dataContractTypes,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getContractTypesAction.rejected, (state, action) => {
      state.dataContractTypes = {
        ...state.dataContractTypes,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    builder.addCase(getDetailContractTypeAction.pending, (state) => {
      state.dataDetailContractType = {
        ...state.dataDetailContractType,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailContractTypeAction.fulfilled,
      (state, action: PayloadAction<DetailContractTypeResponse>) => {
        state.dataDetailContractType = {
          ...state.dataDetailContractType,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailContractTypeAction.rejected, (state, action) => {
      state.dataDetailContractType = {
        ...state.dataDetailContractType,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default contractTypeSlice.reducer;
