"use client";

import React, { useEffect, useState } from "react";
import MenuDormitoryClient from "../MenuDormitoryClient/MenuDormitoryClient";
import { Button, ConfigProvider, Image } from "antd";
import { HomeOutlined, MergeCellsOutlined } from "@ant-design/icons";
import "./style.scss";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/auth/auth.reducer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { themeAntdClient } from "@/config/theme";
import { getInfomationStudentAction } from "@/store/students/students.action";

const DormitoryClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.authSlice);

  const [isClient, setIsClient] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    if (!isClient && !user._id) {
      dispatch(logout());
      router.push("/truy-cap");
    }
  }, [dispatch, user._id, isClient]);

  useEffect(() => {
    dispatch(getInfomationStudentAction());
  }, [dispatch]);

  const handleLogout = () => {
    // Hiển thị thông báo
    toast.success("🦄 Đăng xuất thành công.", { autoClose: 2000 });

    // Delay 2 giây rồi logout
    setTimeout(() => {
      dispatch(logout());
      router.push("/truy-cap");
    }, 2000);
  };

  if (isClient) {
    return null;
  }

  return (
    <ConfigProvider theme={themeAntdClient}>
      <>
        {user._id ? (
          <div className="wrapper-dormitory">
            <div className="wrapper-dormitory-head">
              <div className="header-left">
                <Button
                  href="/"
                  type="text"
                  icon={<HomeOutlined />}
                  className="home-button"
                />
                <Link href="/">
                  <Image
                    src="/images/favicon.ico"
                    width={30}
                    height={30}
                    preview={false}
                  />
                </Link>
                <h1>Ký túc xá DAU</h1>
              </div>
              <Button type="text" onClick={handleLogout}>
                Đăng xuất <MergeCellsOutlined />
              </Button>
            </div>

            <div className="wrapper-dormitory-container">
              <div className="wrapper-dormitory-menu">
                <MenuDormitoryClient />
              </div>

              <div className="wrapper-dormitory-content">{children}</div>
            </div>
          </div>
        ) : null}
      </>
    </ConfigProvider>
  );
};

export default DormitoryClient;
