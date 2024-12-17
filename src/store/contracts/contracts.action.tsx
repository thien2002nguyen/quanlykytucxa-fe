import contractsApi from "@/store/contracts/contracts.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ParameterGetContract,
  ParameterPostContract,
  ParameterRegisterRoomService,
  ParameterCancelRoomService,
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

// Confirm contract a contract by ID
const confirmContractAction = createAsyncThunk(
  "contracts/confirmContract",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.confirmContract(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

// Cancel contract a contract by ID
const cancelContractAction = createAsyncThunk(
  "contracts/cancelContract",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.cancelContract(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

// Check in room a contract by ID
const checkInRoomAction = createAsyncThunk(
  "contracts/checkInRoom",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.checkInRoom(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

// Check out room a contract by ID
const checkOutRoomAction = createAsyncThunk(
  "contracts/checkOutRoom",
  async (id: string, thunkAPI) => {
    try {
      const res = await contractsApi.checkOutRoom(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

// Register service a contract by ID
const registerRoomServiceAction = createAsyncThunk(
  "contracts/registerRoomService",
  async (params: ParameterRegisterRoomService, thunkAPI) => {
    try {
      const res = await contractsApi.registerRoomService(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

// Cancel service a contract by ID
const cancelRoomServiceAction = createAsyncThunk(
  "contracts/canCelRoomService",
  async (params: ParameterCancelRoomService, thunkAPI) => {
    try {
      const res = await contractsApi.canCelRoomService(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật hợp đồng thất bại.",
      });
    }
  }
);

export {
  getContractsAction,
  postContractAction,
  getDetailContractAction,
  deleteContractAction,
  confirmContractAction,
  cancelContractAction,
  checkInRoomAction,
  checkOutRoomAction,
  registerRoomServiceAction,
  cancelRoomServiceAction,
};
