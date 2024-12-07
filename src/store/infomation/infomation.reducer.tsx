import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getInfomationsAction,
  getDetailInfomationAction,
  putInfomationAction,
} from "./infomation.action";
import {
  InfomationResponse,
  Infomation,
  InfomationState,
  DetailInfomationResponse,
} from "./infomation.type";
import { MetaPagination } from "@/utils/contants";

const initialState: InfomationState = {
  dataInfomations: {
    data: [] as Infomation[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailInfomation: {
    data: {} as Infomation,
    loading: false,
    error: undefined,
  },
};

const infomationSlice = createSlice({
  name: "infomation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get list infomation----------
    builder.addCase(getInfomationsAction.pending, (state) => {
      state.dataInfomations = {
        ...state.dataInfomations,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getInfomationsAction.fulfilled,
      (state, action: PayloadAction<InfomationResponse>) => {
        state.dataInfomations = {
          ...state.dataInfomations,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getInfomationsAction.rejected, (state, action) => {
      state.dataInfomations = {
        ...state.dataInfomations,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail infomation----------
    builder.addCase(getDetailInfomationAction.pending, (state) => {
      state.dataDetailInfomation = {
        ...state.dataDetailInfomation,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailInfomationAction.fulfilled,
      (state, action: PayloadAction<DetailInfomationResponse>) => {
        state.dataDetailInfomation = {
          ...state.dataDetailInfomation,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailInfomationAction.rejected, (state, action) => {
      state.dataDetailInfomation = {
        ...state.dataDetailInfomation,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------update infomation----------
    builder.addCase(putInfomationAction.pending, (state) => {
      state.dataInfomations = {
        ...state.dataInfomations,
        loading: false,
        error: undefined,
      };
    });

    builder.addCase(
      putInfomationAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.dataInfomations = {
          ...state.dataInfomations,
          data: state.dataInfomations.data?.map((item) => {
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

    builder.addCase(putInfomationAction.rejected, (state, action) => {
      state.dataInfomations = {
        ...state.dataInfomations,
        loading: false,
        error: action.error.message || "Cập nhật dữ liệu thất bại.",
      };
    });
  },
});

export default infomationSlice.reducer;
