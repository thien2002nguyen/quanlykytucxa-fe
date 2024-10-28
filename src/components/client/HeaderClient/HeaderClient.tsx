"use client";

import React, { useEffect, useRef } from "react";
import { incrementMonthlyVisitsAction } from "@/store/monthly-visits/monthly-visits.action";
import { useAppDispatch } from "@/store";

const HeaderClient = () => {
  const dispatch = useAppDispatch();
  const hasCalledAction = useRef(false);

  useEffect(() => {
    if (!hasCalledAction.current) {
      dispatch(incrementMonthlyVisitsAction());
      hasCalledAction.current = true; // Đánh dấu là đã gọi action
    }
  }, [dispatch]);

  return <header className="container">Nguyễn Cảnh Thiện Header</header>;
};

export default HeaderClient;
