"use client";

import React, { useEffect, useState } from "react";
import {
  Image,
  message,
  Button,
  Modal,
  Space,
  Switch,
  Table,
  Flex,
  TableProps,
} from "antd";
import { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UploadSingleImage from "@/components/uploads/UploadSingleImage/UploadSingleImage";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getBannersAction,
  deleteBannerAction,
  getDetailBannerAction,
  patchMultiActiveBannerAction,
  postBannersAction,
  putBannerAction,
} from "@/store/banners/banners.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";
import { v4 as uuidv4 } from "uuid";

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
    width: 160,
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
  const { dataBanners, dataDetailBanner } = useAppSelector(
    (state) => state.bannersSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<UploadFile[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { url } = dataDetailBanner.data;
      setCurrentFile([
        {
          name: uuidv4(),
          uid: uuidv4(),
          url,
          status: "done",
        },
      ]);
    } else {
      setCurrentFile([]);
    }
  }, [formAction, dataDetailBanner.data]);

  useEffect(() => {
    dispatch(getBannersAction());
  }, [dispatch]);

  const handleChangeActive = async (bannerIds: string[], isActive: boolean) => {
    const response: any = await dispatch(
      patchMultiActiveBannerAction({ bannerIds, isActive })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Cập nhật trạng thái thành công.");
      setSelectedRowKeys([]);
    }
  };

  const dataSource: DataType[] = dataBanners.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    image: (
      <Image
        src={item.url}
        width={100}
        height={40}
        style={{ objectFit: "contain" }}
      />
    ),
    status: (
      <Switch
        checkedChildren="Bật"
        unCheckedChildren="Tắt"
        checked={item.isActive}
        onChange={(checked) => handleChangeActive([item._id], checked)}
      />
    ),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailBannerAction(item._id));
            setFormAction(FormAction.UPDATE);
            setIsModalOpen(true);
          }}
        />
        <Button
          icon={<DeleteOutlined />}
          danger
          type="primary"
          onClick={() => setModalDelete(item._id)}
        />
      </Space>
    ),
  }));

  const handleSubmit = async () => {
    if (!currentFile?.[0]) {
      messageApi.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm mới banner thành công."
        : "Cập nhật banner thành công";

    setIsLoading(true);
    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postBannersAction({
          url: currentFile?.[0]?.response?.secure_url,
        })
      );
    } else {
      response = await dispatch(
        putBannerAction({
          id: dataDetailBanner.data._id,
          url: currentFile?.[0]?.response?.secure_url,
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      setCurrentFile([]);
      setIsModalOpen(false);
      dispatch(getBannersAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteBannerAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa banner thành công.");
      setModalDelete(undefined);
      dispatch(getBannersAction());
    }

    setIsDeleteLoading(false);
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
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm banner mới
          </Button>,
          <Switch
            checkedChildren="Bật tất cả"
            unCheckedChildren="Tắt tất cả"
            defaultChecked
            onChange={(checked) =>
              handleChangeActive(selectedRowKeys as string[], checked)
            }
          />,
        ]}
      />

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys) =>
            setSelectedRowKeys(newSelectedRowKeys),
        }}
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataBanners.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới banner"
            : "Cập nhật banner"
        }
        open={isModalOpen}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Flex vertical gap={12}>
          <p>Hình ảnh banner</p>
          <UploadSingleImage
            currentFileList={currentFile}
            onChange={setCurrentFile}
            formAction={formAction}
          />
        </Flex>
      </Modal>

      <Modal
        title="Xóa dữ liệu"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
      >
        <p>Bạn có chắc chắn muốn xóa banner này?</p>
      </Modal>
    </div>
  );
};

export default ManageBanners;
