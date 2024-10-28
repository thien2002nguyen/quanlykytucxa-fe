import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBannersAction } from "./banners.action";
import { BannersResponse, Banners, BannersState } from "./banners.type";

const initialState: BannersState = {
  dataBanners: {
    data: [] as Banners[],
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
  },
});

export default bannersSlice.reducer;
