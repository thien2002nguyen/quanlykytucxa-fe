import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSchoolAction } from "./school.action";
import { School, SchoolResponse, SchoolState } from "./school.type";

const initialState: SchoolState = {
  dataSchool: {
    data: {} as School,
    loading: false,
    error: undefined,
  },
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get school----------
    builder.addCase(getSchoolAction.pending, (state) => {
      state.dataSchool = {
        ...state.dataSchool,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getSchoolAction.fulfilled,
      (state, action: PayloadAction<SchoolResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataSchool = {
          ...state.dataSchool,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getSchoolAction.rejected, (state, action) => {
      state.dataSchool = {
        ...state.dataSchool,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default schoolSlice.reducer;
