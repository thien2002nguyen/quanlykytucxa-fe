import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRoomsAction,
  getDetailRoomAction,
  putRoomAction,
} from "./rooms.action";
import {
  RoomsResponse,
  Room,
  RoomsState,
  DetailRoomResponse,
} from "./rooms.type";
import { MetaPagination } from "@/utils/contants";

const initialState: RoomsState = {
  dataRooms: {
    data: [] as Room[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailRoom: {
    data: {} as Room,
    loading: false,
    error: undefined,
  },
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get rooms----------
    builder.addCase(getRoomsAction.pending, (state) => {
      state.dataRooms = {
        ...state.dataRooms,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getRoomsAction.fulfilled,
      (state, action: PayloadAction<RoomsResponse>) => {
        state.dataRooms = {
          ...state.dataRooms,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getRoomsAction.rejected, (state, action) => {
      state.dataRooms = {
        ...state.dataRooms,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail room----------
    builder.addCase(getDetailRoomAction.pending, (state) => {
      state.dataDetailRoom = {
        ...state.dataDetailRoom,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailRoomAction.fulfilled,
      (state, action: PayloadAction<DetailRoomResponse>) => {
        state.dataDetailRoom = {
          ...state.dataDetailRoom,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailRoomAction.rejected, (state, action) => {
      state.dataDetailRoom = {
        ...state.dataDetailRoom,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------update room----------
    builder.addCase(putRoomAction.pending, (state) => {
      state.dataRooms = {
        ...state.dataRooms,
        loading: false,
        error: undefined,
      };
    });

    builder.addCase(
      putRoomAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.dataRooms = {
          ...state.dataRooms,
          data: state.dataRooms.data?.map((item) => {
            if (item._id === action.payload.id) {
              return {
                ...item,
                isActive: action.payload.isActive,
              };
            }

            return item;
          }),
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(putRoomAction.rejected, (state, action) => {
      state.dataRooms = {
        ...state.dataRooms,
        loading: false,
        error: action.error.message || "Cập nhật dữ liệu thất bại.",
      };
    });
  },
});

export default roomsSlice.reducer;
