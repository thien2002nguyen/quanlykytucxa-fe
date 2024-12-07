import contractTermsApi from "@/store/contract-terms/contract-terms.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterPostContractTerm,
  ParameterPutContractTerm,
} from "./contract-terms.type";

// Get all contract terms
const getContractTermsAction = createAsyncThunk(
  "contractTerms/getContractTerms",
  async (_, thunkAPI) => {
    try {
      const res = await contractTermsApi.getContractTerms();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Create a new contract term
const postContractTermAction = createAsyncThunk(
  "contractTerms/postContractTerm",
  async (params: ParameterPostContractTerm, thunkAPI) => {
    try {
      const res = await contractTermsApi.postContractTerm(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

// Get a specific contract term's details by ID
const getDetailContractTermAction = createAsyncThunk(
  "contractTerms/getDetailContractTerm",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractTermsApi.getDetailContractTerm(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Update a contract term
const putContractTermAction = createAsyncThunk(
  "contractTerms/putContractTerm",
  async (params: ParameterPutContractTerm, thunkAPI) => {
    try {
      const res = await contractTermsApi.putContractTerm(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

// Delete a contract term by ID
const deleteContractTermAction = createAsyncThunk(
  "contractTerms/deleteContractTerm",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractTermsApi.deleteContractTerm(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getContractTermsAction,
  postContractTermAction,
  getDetailContractTermAction,
  putContractTermAction,
  deleteContractTermAction,
};
