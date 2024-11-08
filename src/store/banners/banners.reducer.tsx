import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getBannersAction,
  getDetailBannerAction,
  patchMultiActiveBannerAction,
} from "./banners.action";
import {
  BannersResponse,
  Banner,
  BannersState,
  DetailBannerResponse,
} from "./banners.type";

const initialState: BannersState = {
  dataBanners: {
    data: [] as Banner[],
    loading: false,
    error: undefined,
  },

  dataDetailBanner: {
    data: {} as Banner,
    loading: false,
    error: undefined,
  },
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get banners----------
    builder.addCase(getBannersAction.pending, (state) => {
      state.dataBanners = {
        ...state.dataBanners,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getBannersAction.fulfilled,
      (state, action: PayloadAction<BannersResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataBanners = {
          ...state.dataBanners,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getBannersAction.rejected, (state, action) => {
      state.dataBanners = {
        ...state.dataBanners,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------get detail banners----------
    builder.addCase(getDetailBannerAction.pending, (state) => {
      state.dataDetailBanner = {
        ...state.dataDetailBanner,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailBannerAction.fulfilled,
      (state, action: PayloadAction<DetailBannerResponse>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataDetailBanner = {
          ...state.dataDetailBanner,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailBannerAction.rejected, (state, action) => {
      state.dataDetailBanner = {
        ...state.dataDetailBanner,
        loading: false,
        error: action.error.message || "Lấy dữ liệu thất bại.",
      };
    });

    //----------patch multi active banners----------
    builder.addCase(patchMultiActiveBannerAction.pending, (state) => {
      state.dataBanners = {
        ...state.dataBanners,
        loading: false,
        error: undefined,
      };
    });

    builder.addCase(
      patchMultiActiveBannerAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        // Cập nhật state với dữ liệu từ action.payload
        state.dataBanners = {
          ...state.dataBanners,
          data: state.dataBanners.data?.map((item) => {
            if (action.payload?.bannerIds?.includes(item._id)) {
              return {
                ...item,
                isActive: action.payload?.isActive,
              };
            }

            return item;
          }),
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(patchMultiActiveBannerAction.rejected, (state, action) => {
      state.dataBanners = {
        ...state.dataBanners,
        loading: false,
        error: action.error.message || "Thay đổi trạng thái thất bại.",
      };
    });
  },
});

export default bannersSlice.reducer;
