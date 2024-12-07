import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getNewsAction,
  getDetailNewsAction,
  putNewsAction,
} from "./news.action";
import { NewsResponse, News, NewsState, DetailNewsResponse } from "./news.type";
import { MetaPagination } from "@/utils/contants";

const initialState: NewsState = {
  dataNews: {
    data: [] as News[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailNews: {
    data: {} as News,
    loading: false,
    error: undefined,
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get list news----------
    builder.addCase(getNewsAction.pending, (state) => {
      state.dataNews = {
        ...state.dataNews,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getNewsAction.fulfilled,
      (state, action: PayloadAction<NewsResponse>) => {
        state.dataNews = {
          ...state.dataNews,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getNewsAction.rejected, (state, action) => {
      state.dataNews = {
        ...state.dataNews,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail news----------
    builder.addCase(getDetailNewsAction.pending, (state) => {
      state.dataDetailNews = {
        ...state.dataDetailNews,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailNewsAction.fulfilled,
      (state, action: PayloadAction<DetailNewsResponse>) => {
        state.dataDetailNews = {
          ...state.dataDetailNews,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailNewsAction.rejected, (state, action) => {
      state.dataDetailNews = {
        ...state.dataDetailNews,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------update news----------
    builder.addCase(putNewsAction.pending, (state) => {
      state.dataNews = {
        ...state.dataNews,
        loading: false,
        error: undefined,
      };
    });

    builder.addCase(
      putNewsAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.dataNews = {
          ...state.dataNews,
          data: state.dataNews.data?.map((item) => {
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

    builder.addCase(putNewsAction.rejected, (state, action) => {
      state.dataNews = {
        ...state.dataNews,
        loading: false,
        error: action.error.message || "Cập nhật dữ liệu thất bại.",
      };
    });
  },
});

export default newsSlice.reducer;
