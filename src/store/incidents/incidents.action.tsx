import incidentsApi from "@/store/incidents/incidents.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostIncident, ParameterPutIncident } from "./incidents.type";
import { ParameterGet } from "@/utils/contants";

// Lấy danh sách sự cố
const getIncidentsAction = createAsyncThunk(
  "incidents/getIncidents",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await incidentsApi.getIncidents(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Tạo sự cố mới
const postIncidentAction = createAsyncThunk(
  "incidents/postIncident",
  async (params: ParameterPostIncident, thunkAPI) => {
    try {
      const res = await incidentsApi.postIncident(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

// Lấy chi tiết sự cố theo ID
const getDetailIncidentAction = createAsyncThunk(
  "incidents/getDetailIncident",
  async (idOrSlug: string, thunkAPI) => {
    try {
      const res = await incidentsApi.getDetailIncident(idOrSlug);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

// Cập nhật thông tin sự cố
const putIncidentAction = createAsyncThunk(
  "incidents/putIncident",
  async (params: ParameterPutIncident, thunkAPI) => {
    try {
      const res = await incidentsApi.putIncident(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

export {
  getIncidentsAction,
  postIncidentAction,
  getDetailIncidentAction,
  putIncidentAction,
};
