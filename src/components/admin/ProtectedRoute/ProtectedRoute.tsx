"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { Button, Result } from "antd";
import { RoleAuth } from "@/store/auth/auth.type";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleAuth;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user } = useAppSelector((state) => state.authSlice);

  // Nếu người dùng không có quyền truy cập thì hiển thị 403
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        extra={
          <Button type="primary" size="large" href="/admin">
            Quay về trang chủ
          </Button>
        }
      />
    );
  }

  // Nếu người dùng có quyền, hiển thị nội dung của trang
  return <>{children}</>;
};

export default ProtectedRoute;
