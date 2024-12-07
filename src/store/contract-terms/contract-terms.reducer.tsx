import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getContractTermsAction,
  getDetailContractTermAction,
} from "./contract-terms.action";
import {
  ContractTermsResponse,
  ContractTerm,
  ContractTermsState,
  DetailContractTermResponse,
} from "./contract-terms.type";

const initialState: ContractTermsState = {
  dataContractTerms: {
    data: [] as ContractTerm[],
    loading: false,
    error: undefined,
  },

  dataDetailContractTerm: {
    data: {} as ContractTerm,
    loading: false,
    error: undefined,
  },
};

const contractTermsSlice = createSlice({
  name: "contractTerms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get contract terms----------
    builder.addCase(getContractTermsAction.pending, (state) => {
      state.dataContractTerms = {
        ...state.dataContractTerms,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getContractTermsAction.fulfilled,
      (state, action: PayloadAction<ContractTermsResponse>) => {
        state.dataContractTerms = {
          ...state.dataContractTerms,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getContractTermsAction.rejected, (state, action) => {
      state.dataContractTerms = {
        ...state.dataContractTerms,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail contract term----------
    builder.addCase(getDetailContractTermAction.pending, (state) => {
      state.dataDetailContractTerm = {
        ...state.dataDetailContractTerm,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailContractTermAction.fulfilled,
      (state, action: PayloadAction<DetailContractTermResponse>) => {
        state.dataDetailContractTerm = {
          ...state.dataDetailContractTerm,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailContractTermAction.rejected, (state, action) => {
      state.dataDetailContractTerm = {
        ...state.dataDetailContractTerm,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default contractTermsSlice.reducer;
