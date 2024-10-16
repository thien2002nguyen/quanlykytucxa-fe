"use client";

import { themeAntdAdmin } from "@/config/theme";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, ConfigProvider, Flex, Image } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { adminRoutes } from "../MenuAdmin/routes";
import { logout } from "@/store/admin/admin.reducer";
import { LogoutOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./style.scss";

const MainAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isLoginPage = pathname.includes("admin/dang-nhap");

  const { admin, token } = useAppSelector((state) => state.adminSlice);

  const [pageLabel, setPageLabel] = useState<string>("");

  useEffect(() => {
    if (!token.accessToken && !admin._id) {
      router.push("/admin/dang-nhap");
      return;
    }
  }, [token, admin]);

  // Hàm để tìm label tương ứng với key từ pathname
  const findLabelByPath = (routes: any[], path: string): string | undefined => {
    for (const route of routes) {
      if (route.key && path.includes(route.key)) {
        if (route.items) {
          // Kiểm tra trong items nếu có
          const labelItemRoute = findLabelByPath(route.items, path);

          if (labelItemRoute) {
            return labelItemRoute;
          }
        } else {
          return route.label;
        }
      }
    }
  };

  // Cập nhật label dựa trên pathname
  useEffect(() => {
    const label = findLabelByPath(adminRoutes, pathname) || "Thống kê";
    setPageLabel(label);
  }, [pathname]);

  return (
    <ConfigProvider theme={themeAntdAdmin}>
      {isLoginPage ? (
        children
      ) : (
        <>
          {token.accessToken && admin._id ? ( // Chỉ render nội dung nếu đã đăng nhập
            <div className="main-admin-wrapper">
              {/* Menu Admin Wrapper */}
              <div className="menu-wrapper">
                <MenuAdmin />
              </div>

              {/* Content Wrapper */}
              <div className="content-wrapper">
                <div className="header">
                  <Flex align="center" gap={8}>
                    <Image
                      width={40}
                      height={40}
                      src="/images/favicon.ico"
                      preview={false}
                    />
                    <Title level={3} style={{ marginBottom: 0 }}>
                      {pageLabel}
                    </Title>
                  </Flex>
                  <Button
                    type="text"
                    size="large"
                    icon={<LogoutOutlined />}
                    onClick={() => {
                      dispatch(logout());
                      router.push("/admin/dang-nhap");
                    }}
                  >
                    Đăng xuất
                  </Button>
                </div>
                <div className="content">
                  <div className="layout-content">{children}</div>
                </div>
              </div>
            </div>
          ) : null}{" "}
          {/* Không render gì nếu chưa đăng nhập */}
        </>
      )}
    </ConfigProvider>
  );
};

export default MainAdmin;
