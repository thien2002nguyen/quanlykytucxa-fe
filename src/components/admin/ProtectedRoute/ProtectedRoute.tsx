"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { Button, Result } from "antd";
import Link from "next/link";
import { RoleAuth } from "@/store/auth/auth.type";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleAuth;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user } = useAppSelector((state) => state.authAdminSlice);

  // Nếu người dùng không có quyền truy cập thì hiển thị 403
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập trang này."
        extra={
          <Link href="/admin" passHref>
            <Button type="primary" size="large">
              Quay về trang chủ
            </Button>
          </Link>
        }
      />
    );
  }

  // Nếu người dùng có quyền, hiển thị nội dung của trang
  return <>{children}</>;
};

export default ProtectedRoute;
