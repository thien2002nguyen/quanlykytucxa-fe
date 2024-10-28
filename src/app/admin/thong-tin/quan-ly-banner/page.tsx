"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getBannersAction,
  postBannersAction,
} from "@/store/banners/banners.action";
import {
  Button,
  Flex,
  Image,
  message,
  Modal,
  Pagination,
  Space,
  Switch,
  Table,
  TableProps,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UploadSingleImage from "@/components/uploads/UploadSingleImage/UploadSingleImage";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  id: string;
  stt: number;
  key: string;
  image: React.ReactNode;
  createdAt: string;
  action: React.ReactNode;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    align: "center",
    width: 60,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: 120,
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 160,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 100,
  },
];

const ManageBanners = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { dataBanners } = useAppSelector((state) => state.bannersSlice);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<UploadFile[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    dispatch(getBannersAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataBanners.data.map((item, index) => ({
    id: item._id,
    index: index + 1,
    key: item._id,
    stt: index + 1,
    image: (
      <Image
        src={item.url}
        width={100}
        height={40}
        style={{ objectFit: "contain" }}
      />
    ),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {}}
        />
        <Button
          icon={<DeleteOutlined />}
          danger
          type="primary"
          onClick={() => {}}
        />
      </Space>
    ),
  }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!currentFile?.[0]?.response?.secure_url) {
      messageApi.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    setLoading(true);
    const response = await dispatch(
      postBannersAction({
        url: currentFile?.[0]?.response?.secure_url,
      })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Thêm mới banner thành công.");
      setCurrentFile([]);
      setIsModalOpen(false);
      dispatch(getBannersAction());
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setCurrentFile([]);
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <HeadAdminContent
        title="Danh sách banner"
        extra={[
          <Button type="primary" onClick={showModal}>
            Thêm banner mới
          </Button>,
          <Switch
            checkedChildren="Bật tất cả"
            unCheckedChildren="Tắt tất cả"
            defaultChecked
          />,
        ]}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        bordered
      />

      <Modal
        title="Thêm mới banner"
        open={isModalOpen}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      >
        <Flex vertical gap={12}>
          <p>Hình ảnh banner</p>
          <UploadSingleImage
            currentFileList={currentFile}
            onChange={setCurrentFile}
          />
        </Flex>
      </Modal>
    </div>
  );
};

export default ManageBanners;
