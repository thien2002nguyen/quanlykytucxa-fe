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
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getRoomTypesAction,
  deleteRoomTypeAction,
  getDetailRoomTypeAction,
  postRoomTypeAction,
  putRoomTypeAction,
} from "@/store/room-types/room-types.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";
import { formatVND, parseVND } from "@/utils/formatMoney";

interface RoomTypeInterface {
  type: string;
  price: string;
}

interface DataType {
  id: string;
  stt: number;
  key: string;
  type: string;
  price: string;
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
    title: "Loại phòng",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Giá phòng (VND)",
    dataIndex: "price",
    key: "price",
    align: "center",
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

const RoomType = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [formRef] = Form.useForm<RoomTypeInterface>();

  const { dataRoomTypes, dataDetailRoomType } = useAppSelector(
    (state) => state.roomTypesSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { type, price } = dataDetailRoomType.data;
      formRef.setFieldsValue({
        type,
        price: formatVND(price || 0),
      });
    }
  }, [formAction, dataDetailRoomType.data, formRef]);

  useEffect(() => {
    dispatch(getRoomTypesAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataRoomTypes.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    type: item.type,
    price: formatVND(item.price || 0),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailRoomTypeAction(item._id));
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
        ? "Thêm mới loại phòng thành công."
        : "Cập nhật loại phòng thành công";

    setIsLoading(true);
    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postRoomTypeAction({
          type: formRef.getFieldValue("type"),
          price: parseVND(formRef.getFieldValue("price") || "0"),
        })
      );
    } else {
      response = await dispatch(
        putRoomTypeAction({
          id: dataDetailRoomType.data._id,
          type: formRef.getFieldValue("type"),
          price: parseVND(formRef.getFieldValue("price") || "0"),
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      formRef.resetFields();
      setIsModalOpen(false);
      dispatch(getRoomTypesAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteRoomTypeAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa loại phòng thành công.");
      setModalDelete(undefined);
      dispatch(getRoomTypesAction());
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
        title="Danh sách loại phòng"
        extra={[
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm loại phòng mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataRoomTypes.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới loại phòng"
            : "Cập nhật loại phòng"
        }
        open={isModalOpen}
        okText="Lưu"
        cancelText="Hủy"
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        centered
      >
        <Form
          name="form-room-type"
          form={formRef}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại phòng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập loại phòng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá phòng (VND)"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá phòng!",
                  },
                ]}
              >
                <Input
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      !(e.key >= "0" && e.key <= "9") && // Kiểm tra xem phím có phải là số không
                      e.key !== "Backspace" && // Cho phép phím Backspace
                      e.key !== "ArrowLeft" && // Cho phép phím mũi tên trái
                      e.key !== "ArrowRight" && // Cho phép phím mũi tên phải
                      e.key !== "Delete" // Cho phép phím Delete
                    ) {
                      e.preventDefault(); // Ngừng hành động mặc định nếu không phải phím hợp lệ
                    }
                  }}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const inputElement = e.currentTarget;

                    const value = inputElement.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
                    inputElement.value = formatVND(Number(value)); // Format lại giá trị
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Xóa dữ liệu"
        okText="Xóa"
        cancelText="Hủy"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
        centered
      >
        <p>Bạn có chắc chắn muốn xóa loại phòng này không?</p>
      </Modal>
    </div>
  );
};

export default RoomType;
