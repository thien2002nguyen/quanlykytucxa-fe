"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { Button, ConfigProvider, Flex, Image } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { adminRoutes } from "../MenuAdmin/routes";
import { logout } from "@/store/auth/auth.reducer";
import { MergeCellsOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./style.scss";
import { toast } from "react-toastify";
import { RoleAuth } from "@/store/auth/auth.type";
import { themeAntdAdmin } from "@/config/theme";

const MainAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isLoginPage = pathname.includes("admin/dang-nhap");

  const { user } = useAppSelector((state) => state.authSlice);

  const [pageLabel, setPageLabel] = useState<string>("");
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    if (!isClient) {
      if (!user._id || (user && user.role === RoleAuth.STUDENT)) {
        dispatch(logout());
        router.push("/admin/dang-nhap");
        return;
      }
    }
  }, [isClient, user]);

  // Cập nhật label dựa trên pathname
  useEffect(() => {
    const label = findLabelByPath(adminRoutes, pathname) || "Thống kê";
    setPageLabel(label);
  }, [pathname]);

  // loading xong thì trả về dữ liệu
  useEffect(() => {
    setIsClient(false);
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
    toast.success("🦄 Đăng xuất thành công.", { autoClose: 2000 });

    // Delay 2 giây rồi logout
    setTimeout(() => {
      dispatch(logout());
      router.push("/admin/dang-nhap");
    }, 2000);
  };

  // Nếu đang loading thì không render gì
  if (isClient) {
    return null;
  }

  return (
    <ConfigProvider theme={themeAntdAdmin}>
      {isLoginPage ? (
        children
      ) : (
        <>
          {user._id && user.role !== RoleAuth.STUDENT ? ( // Chỉ render nội dung nếu đã đăng nhập
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
                  <Button type="text" onClick={handleLogout}>
                    Đăng xuất <MergeCellsOutlined />
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
