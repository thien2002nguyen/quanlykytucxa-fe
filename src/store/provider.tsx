"use client";

import React from "react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "./index";

// Khởi tạo persist store
persistStore(store);

// Component ReduxProvider sử dụng Provider để cung cấp store cho ứng dụng
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
