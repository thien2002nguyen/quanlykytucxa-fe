import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRoomBlocksAction,
  getDetailRoomBlockAction,
} from "./room-blocks.action";
import {
  RoomBlocksResponse,
  RoomBlock,
  RoomBlocksState,
  DetailRoomBlockResponse,
} from "./room-blocks.type";

const initialState: RoomBlocksState = {
  dataRoomBlocks: {
    data: [] as RoomBlock[],
    loading: false,
    error: undefined,
  },

  dataDetailRoomBlock: {
    data: {} as RoomBlock,
    loading: false,
    error: undefined,
  },
};

const roomBlocksSlice = createSlice({
  name: "roomBlocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get room blocks----------
    builder.addCase(getRoomBlocksAction.pending, (state) => {
      state.dataRoomBlocks = {
        ...state.dataRoomBlocks,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getRoomBlocksAction.fulfilled,
      (state, action: PayloadAction<RoomBlocksResponse>) => {
        state.dataRoomBlocks = {
          ...state.dataRoomBlocks,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getRoomBlocksAction.rejected, (state, action) => {
      state.dataRoomBlocks = {
        ...state.dataRoomBlocks,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail room block----------
    builder.addCase(getDetailRoomBlockAction.pending, (state) => {
      state.dataDetailRoomBlock = {
        ...state.dataDetailRoomBlock,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailRoomBlockAction.fulfilled,
      (state, action: PayloadAction<DetailRoomBlockResponse>) => {
        state.dataDetailRoomBlock = {
          ...state.dataDetailRoomBlock,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailRoomBlockAction.rejected, (state, action) => {
      state.dataDetailRoomBlock = {
        ...state.dataDetailRoomBlock,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });
  },
});

export default roomBlocksSlice.reducer;
