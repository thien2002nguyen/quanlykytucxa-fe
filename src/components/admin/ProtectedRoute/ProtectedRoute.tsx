"use client";

import React from "react";
import { useAppSelector } from "@/store";
import { RoleAdmin } from "@/store/auth-admin/auth-admin.type";
import { Button, Result } from "antd";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: RoleAdmin;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { admin } = useAppSelector((state) => state.authAdminSlice);

  // Nếu người dùng không có quyền truy cập thì hiển thị 403
  if (requiredRole && admin.role !== requiredRole) {
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
