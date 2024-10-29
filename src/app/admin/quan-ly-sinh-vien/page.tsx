"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { Button, Input, Table } from "antd";
import {
  PlusOutlined,
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ManageStudents = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <HeadAdminContent
        title="Danh sách sinh viên"
        extra={[
          <Input placeholder="Tìm kiếm tên sinh viên..." />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm sinh viên mới
          </Button>,
          <Button type="primary" icon={<FileAddOutlined />}>
            Import danh sách sinh viên
          </Button>,
        ]}
      />

      <Table bordered></Table>
    </div>
  );
};

export default ManageStudents;
