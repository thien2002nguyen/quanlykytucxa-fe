import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authSlice from "./auth/auth.reducer";
import { AuthState } from "./auth/auth.type";
import usersSlice from "./users/users.reducer";
import monthlyVisitsSlice from "./monthly-visits/monthly-visits.reducer";
import bannersSlice from "./banners/banners.reducer";
import schoolSlice from "./school/school.reducer";
import introductionSlice from "./introduction/introduction.reducer";
import unitPriceSlice from "./unit-price/unit-price.reducer";
import studentsSlice from "./students/students.reducer";
import roomTypesSlice from "./room-types/room-types.reducer";
import roomBlocksSlice from "./room-blocks/room-blocks.reducer";
import servicesSlice from "./services/services.reducer";
import roomsSlice from "./rooms/rooms.reducer";
import newsSlice from "./news/news.reducer";
import infomationSlice from "./infomation/infomation.reducer";
import contractTermsSlice from "./contract-terms/contract-terms.reducer";
import contractTypesSlice from "./contract-types/contract-types.reducer";
import contractsSlice from "./contracts/contracts.reducer";
import paymentsSlice from "./payments/payments.reducer";
import incidentsSlice from "./incidents/incidents.reducer";

// Tạo storage cho redux-persist
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

// Kiểm tra môi trường để tạo storage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Cấu hình cho redux-persist
const authPersistConfig = {
  key: "auth-kytucxadau",
  storage,
  whitelist: ["user", "token"], // Chỉ lưu trữ user và token
};

// Tạo store với redux-persist
export const store = configureStore({
  reducer: {
    authSlice: persistReducer<AuthState>(authPersistConfig, authSlice),
    usersSlice,
    monthlyVisitsSlice,
    bannersSlice,
    schoolSlice,
    introductionSlice,
    unitPriceSlice,
    studentsSlice,
    roomTypesSlice,
    roomBlocksSlice,
    servicesSlice,
    roomsSlice,
    newsSlice,
    infomationSlice,
    contractTermsSlice,
    contractTypesSlice,
    contractsSlice,
    paymentsSlice,
    incidentsSlice,
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
