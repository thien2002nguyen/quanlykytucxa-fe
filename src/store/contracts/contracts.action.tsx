import contractsApi from "@/store/contracts/contracts.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterGetContract,
  ParameterPostContract,
  ParameterPutContract,
} from "./contracts.type";

// Get all contracts
const getContractsAction = createAsyncThunk(
  "contracts/getContracts",
  async (params: ParameterGetContract, thunkAPI) => {
    try {
      const res = await contractsApi.getContracts(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Create a new contract
const postContractAction = createAsyncThunk(
  "contracts/postContract",
  async (params: ParameterPostContract, thunkAPI) => {
    try {
      const res = await contractsApi.postContract(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

// Get a specific contract's details by ID
const getDetailContractAction = createAsyncThunk(
  "contracts/getDetailContract",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.getDetailContract(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Update a contract
const putContractAction = createAsyncThunk(
  "contracts/putContract",
  async (params: ParameterPutContract, thunkAPI) => {
    try {
      const res = await contractsApi.putContract(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

// Delete a contract by ID
const deleteContractAction = createAsyncThunk(
  "contracts/deleteContract",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.deleteContract(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

export {
  getContractsAction,
  postContractAction,
  getDetailContractAction,
  putContractAction,
  deleteContractAction,
};
