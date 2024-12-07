import contractTypesApi from "@/store/contract-types/contract-types.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterPostContractType,
  ParameterPutContractType,
} from "./contract-types.type";

// Get all contract types
const getContractTypesAction = createAsyncThunk(
  "contractTypes/getContractTypes",
  async (_, thunkAPI) => {
    try {
      const res = await contractTypesApi.getContractTypes();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Create a new contract type
const postContractTypeAction = createAsyncThunk(
  "contractTypes/postContractType",
  async (params: ParameterPostContractType, thunkAPI) => {
    try {
      const res = await contractTypesApi.postContractType(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

// Get a specific contract type's details by ID
const getDetailContractTypeAction = createAsyncThunk(
  "contractTypes/getDetailContractType",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractTypesApi.getDetailContractType(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Update a contract type
const putContractTypeAction = createAsyncThunk(
  "contractTypes/putContractType",
  async (params: ParameterPutContractType, thunkAPI) => {
    try {
      const res = await contractTypesApi.putContractType(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

// Delete a contract type by ID
const deleteContractTypeAction = createAsyncThunk(
  "contractTypes/deleteContractType",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractTypesApi.deleteContractType(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getContractTypesAction,
  postContractTypeAction,
  getDetailContractTypeAction,
  putContractTypeAction,
  deleteContractTypeAction,
};
