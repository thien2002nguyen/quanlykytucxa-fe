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
  getServicesAction,
  deleteServiceAction,
  getDetailServiceAction,
  postServiceAction,
  putServiceAction,
} from "@/store/services/services.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";
import { formatVND, parseVND } from "@/utils/formatMoney";
import { ScheduleItem } from "@/store/services/services.type";
import ScheduleItemComponent from "@/components/form/ScheduleItemComponent/ScheduleItemComponent";

interface ServiceInterface {
  name: string;
  price: string;
  schedule: ScheduleItem[];
}

interface DataType {
  id: string;
  stt: number;
  key: string;
  name: string;
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
    title: "Loại dịch vụ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Giá dịch vụ (VND)",
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

const Service = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [formRef] = Form.useForm<ServiceInterface>();

  const { dataServices, dataDetailService } = useAppSelector(
    (state) => state.servicesSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { name, price, schedule } = dataDetailService.data;
      formRef.setFieldsValue({
        name,
        price: formatVND(price || 0),
        schedule: schedule?.map((item) => ({
          dayOfWeek: item.dayOfWeek,
          time: dayjs(item.time, "HH:mm"),
        })),
      });
    }
  }, [formAction, dataDetailService.data, formRef]);

  useEffect(() => {
    dispatch(getServicesAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataServices.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    name: item.name,
    price: formatVND(item.price),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailServiceAction(item._id));
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
        ? "Thêm mới dịch vụ thành công."
        : "Cập nhật dịch vụ thành công";

    setIsLoading(true);

    let response;
    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postServiceAction({
          name: formRef.getFieldValue("name"),
          price: parseVND(formRef.getFieldValue("price") || "0"),
          schedule: formRef
            .getFieldValue("schedule")
            .map((item: ScheduleItem) => ({
              dayOfWeek: item.dayOfWeek,
              time: dayjs(item.time).format("HH:mm"),
            })),
        })
      );
    } else {
      response = await dispatch(
        putServiceAction({
          id: dataDetailService.data._id,
          name: formRef.getFieldValue("name"),
          price: parseVND(formRef.getFieldValue("price") || "0"),
          schedule: formRef
            .getFieldValue("schedule")
            .map((item: ScheduleItem) => ({
              dayOfWeek: item.dayOfWeek,
              time: dayjs(item.time).format("HH:mm"),
            })),
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      formRef.resetFields();
      setIsModalOpen(false);
      dispatch(getServicesAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteServiceAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa dịch vụ thành công.");
      setModalDelete(undefined);
      dispatch(getServicesAction());
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
        title="Danh sách dịch vụ"
        extra={[
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm dịch vụ mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataServices.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới dịch vụ"
            : "Cập nhật dịch vụ"
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
          name="form-service"
          form={formRef}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Loại dịch vụ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập loại dịch vụ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá dịch vụ (VND)"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá dịch vụ!",
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

                    let value = inputElement.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
                    inputElement.value = formatVND(Number(value)); // Format lại giá trị
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Phần lịch trình */}
          <ScheduleItemComponent />
        </Form>
      </Modal>

      <Modal
        title="Xóa dữ liệu"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
        centered
      >
        <p>Bạn có chắc chắn muốn xóa dịch vụ này không?</p>
      </Modal>
    </div>
  );
};

export default Service;
