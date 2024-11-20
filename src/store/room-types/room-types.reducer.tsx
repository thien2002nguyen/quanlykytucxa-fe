import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRoomTypesAction,
  getDetailRoomTypeAction,
} from "./room-types.action";
import {
  RoomTypesResponse,
  RoomType,
  RoomTypesState,
  DetailRoomTypeResponse,
} from "./room-types.type";

const initialState: RoomTypesState = {
  dataRoomTypes: {
    data: [] as RoomType[],
    loading: false,
    error: undefined,
  },

  dataDetailRoomType: {
    data: {} as RoomType,
    loading: false,
    error: undefined,
  },
};

const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get room types----------
    builder.addCase(getRoomTypesAction.pending, (state) => {
      state.dataRoomTypes = {
        ...state.dataRoomTypes,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getRoomTypesAction.fulfilled,
      (state, action: PayloadAction<RoomTypesResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataRoomTypes = {
          ...state.dataRoomTypes,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getRoomTypesAction.rejected, (state, action) => {
      state.dataRoomTypes = {
        ...state.dataRoomTypes,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail room types----------
    builder.addCase(getDetailRoomTypeAction.pending, (state) => {
      state.dataDetailRoomType = {
        ...state.dataDetailRoomType,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailRoomTypeAction.fulfilled,
      (state, action: PayloadAction<DetailRoomTypeResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailRoomType = {
          ...state.dataDetailRoomType,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailRoomTypeAction.rejected, (state, action) => {
      state.dataDetailRoomType = {
        ...state.dataDetailRoomType,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default roomTypesSlice.reducer;
