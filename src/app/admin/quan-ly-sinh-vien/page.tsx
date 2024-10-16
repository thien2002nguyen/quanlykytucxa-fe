"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { Button, Input } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ManageStudents = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <HeadAdminContent
        extra={[
          <Input placeholder="Tìm kiếm tên sinh viên..." />,
          <Button
            type="primary"
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm sinh viên mới
          </Button>,
          <Button type="primary">Import danh sách sinh viên</Button>,
        ]}
      />
    </div>
  );
};

export default ManageStudents;
