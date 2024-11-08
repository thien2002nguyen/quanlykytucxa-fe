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
import React, { useState } from "react";

const ManageStudents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchKey, setSearchKey] = useState<string>("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <HeadAdminContent
        title="Danh sách sinh viên"
        extra={[
          <Input
            key="search-student-name"
            placeholder="Tìm kiếm tên sinh viên..."
            onChange={onSearchChange}
            // value={searchKey}
          />,
          <Button
            key="add-student"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm sinh viên mới
          </Button>,
          <Button
            key="import-student"
            type="primary"
            icon={<FileAddOutlined />}
          >
            Import danh sách sinh viên
          </Button>,
        ]}
      />

      <Table bordered />
    </div>
  );
};

export default ManageStudents;
