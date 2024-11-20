import studentsApi from "@/store/students/students.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ParameterPostStudent, ParameterPutStudent } from "./students.type";
import { ParameterGet } from "@/utils/contants";

const getStudentsAction = createAsyncThunk(
  "students/getStudents",
  async (params: ParameterGet, thunkAPI) => {
    try {
      const res = await studentsApi.getStudents(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const postStudentAction = createAsyncThunk(
  "students/postStudent",
  async (params: ParameterPostStudent, thunkAPI) => {
    try {
      const res = await studentsApi.postStudent(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Tạo dữ liệu thất bại.",
      });
    }
  }
);

const getDetailStudentAction = createAsyncThunk(
  "students/getDetailStudents",
  async (id: string, thunkAPI) => {
    try {
      const res = await studentsApi.getDetailStudent(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const putStudentAction = createAsyncThunk(
  "students/putStudent",
  async (params: ParameterPutStudent, thunkAPI) => {
    try {
      const res = await studentsApi.putStudent(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Cập nhật dữ liệu thất bại.",
      });
    }
  }
);

const deleteStudentAction = createAsyncThunk(
  "students/deleteStudents",
  async (id: string, thunkAPI) => {
    try {
      const res = await studentsApi.deleteStudent(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Xóa dữ liệu thất bại.",
      });
    }
  }
);

const getInfomationStudentAction = createAsyncThunk(
  "students/getInfomationStudent",
  async (_, thunkAPI) => {
    try {
      const res = await studentsApi.getInfomationStudent();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

const importStudentsAction = createAsyncThunk(
  "students/importStudents",
  async (file: File, thunkAPI) => {
    try {
      const res = await studentsApi.importStudents(file);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Import sinh viên thất bại.",
      });
    }
  }
);

const getTotalStudentsAction = createAsyncThunk(
  "students/totalStudents",
  async (_, thunkAPI) => {
    try {
      const res = await studentsApi.totalStudents();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: error?.response?.data?.message || "Lấy dữ liệu thất bại.",
      });
    }
  }
);

export {
  getStudentsAction,
  postStudentAction,
  getDetailStudentAction,
  putStudentAction,
  deleteStudentAction,
  getInfomationStudentAction,
  importStudentsAction,
  getTotalStudentsAction,
};
