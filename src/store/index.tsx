import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authAdminSlice from "./auth-admin/auth-admin.reducer";
import { AuthAdminState } from "./auth-admin/auth-admin.type";
import monthlyVisitsSlice from "./monthly-visits/monthly-visits.reducer";
import bannersSlice from "./banners/banners.reducer";
import schoolSlice from "./school/school.reducer";
import introductionSlice from "./introduction/introduction.reducer";
import unitPriceSlice from "./unit-price/unit-price.reducer";
import adminsSlice from "./admin/admin.reducer";

// Tạo storage cho redux-persist
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

// Kiểm tra môi trường để tạo storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Cấu hình cho redux-persist
const authAdminPersistConfig = {
  key: "auth-quanlykytucxa",
  storage,
  whitelist: ["admin", "token"], // Chỉ lưu trữ admin và token
};

// Tạo store với redux-persist
export const store = configureStore({
  reducer: {
    authAdminSlice: persistReducer<AuthAdminState>(
      authAdminPersistConfig,
      authAdminSlice
    ),
    monthlyVisitsSlice,
    bannersSlice,
    schoolSlice,
    introductionSlice,
    unitPriceSlice,
    adminsSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra tính tuần tự
    }),
});

// Định nghĩa kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Tạo hook sử dụng dispatch và selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
