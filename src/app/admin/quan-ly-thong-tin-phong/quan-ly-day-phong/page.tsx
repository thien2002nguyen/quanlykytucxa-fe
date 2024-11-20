"use client";

import React, { useEffect, useState } from "react";
import {
  message,
  Button,
  Modal,
  Space,
  Table,
  TableProps,
  Form,
  Input,
} from "antd";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getRoomBlocksAction,
  deleteRoomBlockAction,
  getDetailRoomBlockAction,
  postRoomBlockAction,
  putRoomBlockAction,
} from "@/store/room-blocks/room-blocks.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";

interface RoomBlockInterface {
  name: string;
}

interface DataType {
  id: string;
  stt: number;
  key: string;
  name: string;
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
    title: "Dãy phòng",
    dataIndex: "name",
    key: "name",
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

const RoomBlock = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [formRef] = Form.useForm<RoomBlockInterface>();

  const { dataRoomBlocks, dataDetailRoomBlock } = useAppSelector(
    (state) => state.roomBlocksSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { name } = dataDetailRoomBlock.data;
      formRef.setFieldsValue({
        name,
      });
    }
  }, [formAction, dataDetailRoomBlock.data, formRef]);

  useEffect(() => {
    dispatch(getRoomBlocksAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataRoomBlocks.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    name: item.name,
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailRoomBlockAction(item._id));
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
    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm mới dãy phòng thành công."
        : "Cập nhật dãy phòng thành công";

    setIsLoading(true);
    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postRoomBlockAction({
          name: formRef.getFieldValue("name"),
        })
      );
    } else {
      response = await dispatch(
        putRoomBlockAction({
          id: dataDetailRoomBlock.data._id,
          name: formRef.getFieldValue("name"),
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      formRef.resetFields();
      setIsModalOpen(false);
      dispatch(getRoomBlocksAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteRoomBlockAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa dãy phòng thành công.");
      setModalDelete(undefined);
      dispatch(getRoomBlocksAction());
    }

    setIsDeleteLoading(false);
  };

  const handleCancel = () => {
    formRef.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách dãy phòng"
        extra={[
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm dãy phòng mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataRoomBlocks.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới dãy phòng"
            : "Cập nhật dãy phòng"
        }
        open={isModalOpen}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Form
          name="form-room-block"
          form={formRef}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Dãy phòng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập dãy phòng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xóa dữ liệu"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
      >
        <p>Bạn có chắc chắn muốn xóa roomBlock này không?</p>
      </Modal>
    </div>
  );
};

export default RoomBlock;
