"use client";

import React, { useEffect } from "react";
import HeaderClient from "../HeaderClient/HeaderClient";
import FooterClient from "../FooterClient/FooterClient";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAuthMeUserAction } from "@/store/users/users.action";
import { logout } from "@/store/auth/auth.reducer";

const MainClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    try {
      if (user._id) {
        dispatch(getAuthMeUserAction());
      }
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <header>
        <div className="wrapper-warning">
          Website đang trong quá trình phát triển vui lòng không thực hiện bất
          kì thanh toán nào
        </div>
        <HeaderClient />
      </header>
      <main>{children}</main>
      <footer>
        <FooterClient />
      </footer>
    </>
  );
};

export default MainClient;
