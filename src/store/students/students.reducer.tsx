import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getStudentsAction,
  getDetailStudentAction,
  getInfomationStudentAction,
  getTotalStudentsAction,
} from "./students.action";
import {
  StudentResponse,
  Student,
  StudentsState,
  DetailStudentResponse,
  AuthMeStudentResponse,
  TotalStudentResponse,
} from "./students.type";
import { MetaPagination } from "@/utils/contants";

const initialState: StudentsState = {
  dataStudents: {
    data: [] as Student[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailStudent: {
    data: {} as Student,
    loading: false,
    error: undefined,
  },

  dataAuthMeStudent: {
    data: {} as Student,
    loading: false,
    error: undefined,
  },

  dataTotalStudents: {
    data: 0,
    loading: false,
    error: undefined,
  },
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get students----------
    builder.addCase(getStudentsAction.pending, (state) => {
      state.dataStudents = {
        ...state.dataStudents,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getStudentsAction.fulfilled,
      (state, action: PayloadAction<StudentResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataStudents = {
          ...state.dataStudents,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getStudentsAction.rejected, (state, action) => {
      state.dataStudents = {
        ...state.dataStudents,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail students----------
    builder.addCase(getDetailStudentAction.pending, (state) => {
      state.dataDetailStudent = {
        ...state.dataDetailStudent,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailStudentAction.fulfilled,
      (state, action: PayloadAction<DetailStudentResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailStudent = {
          ...state.dataDetailStudent,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailStudentAction.rejected, (state, action) => {
      state.dataDetailStudent = {
        ...state.dataDetailStudent,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get infomation student----------
    builder.addCase(getInfomationStudentAction.pending, (state) => {
      state.dataAuthMeStudent = {
        ...state.dataAuthMeStudent,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getInfomationStudentAction.fulfilled,
      (state, action: PayloadAction<AuthMeStudentResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataAuthMeStudent = {
          ...state.dataAuthMeStudent,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getInfomationStudentAction.rejected, (state, action) => {
      state.dataAuthMeStudent = {
        ...state.dataAuthMeStudent,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get total student----------
    builder.addCase(getTotalStudentsAction.pending, (state) => {
      state.dataTotalStudents = {
        ...state.dataTotalStudents,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getTotalStudentsAction.fulfilled,
      (state, action: PayloadAction<TotalStudentResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataTotalStudents = {
          ...state.dataTotalStudents,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getTotalStudentsAction.rejected, (state, action) => {
      state.dataTotalStudents = {
        ...state.dataTotalStudents,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default studentsSlice.reducer;
