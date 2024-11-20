"use client";

import { themeAntdAdmin } from "@/config/theme";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, ConfigProvider, Flex, Image } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { adminRoutes } from "../MenuAdmin/routes";
import { logout } from "@/store/auth/auth.reducer";
import { LogoutOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./style.scss";
import { toast } from "react-toastify";
import { RoleAuth } from "@/store/auth/auth.type";

const MainAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isLoginPage = pathname.includes("admin/dang-nhap");

  const { user, token } = useAppSelector((state) => state.authAdminSlice);

  const [pageLabel, setPageLabel] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!token.accessToken && !user._id && user.role !== RoleAuth.STUDENT) {
        router.push("/admin/dang-nhap");
        return;
      }
    }
  }, [isLoading, token.accessToken, user._id]);

  // Cập nhật label dựa trên pathname
  useEffect(() => {
    const label = findLabelByPath(adminRoutes, pathname) || "Thống kê";
    setPageLabel(label);
  }, [pathname]);

  // loading xong thì trả về dữ liệu
  useEffect(() => {
    setIsLoading(false);
  }, []);

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

  const handleLogout = () => {
    // Hiển thị thông báo
    toast.success("🦄 Đăng xuất thành công.");

    // Delay 2 giây rồi logout
    setTimeout(() => {
      dispatch(logout());
      router.push("/admin/dang-nhap");
    }, 2000);
  };

  // Nếu đang loading thì không render gì
  if (isLoading) {
    return null;
  }

  return (
    <ConfigProvider theme={themeAntdAdmin}>
      {isLoginPage ? (
        children
      ) : (
        <>
          {token.accessToken && user._id && user.role !== RoleAuth.STUDENT ? ( // Chỉ render nội dung nếu đã đăng nhập
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
                    type="primary"
                    ghost
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Button>
                </div>
                <div className="content">
                  <div className="layout-content">{children}</div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Không render gì nếu chưa đăng nhập */}
        </>
      )}
    </ConfigProvider>
  );
};

export default MainAdmin;
