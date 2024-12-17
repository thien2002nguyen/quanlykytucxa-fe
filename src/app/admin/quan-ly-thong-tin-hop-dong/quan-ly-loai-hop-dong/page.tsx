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
  Tag,
  Input,
  InputNumber,
  Row,
  Col,
  Select,
} from "antd";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getContractTypesAction,
  deleteContractTypeAction,
  getDetailContractTypeAction,
  postContractTypeAction,
  putContractTypeAction,
} from "@/store/contract-types/contract-types.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";
import TextArea from "antd/es/input/TextArea";
import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";

interface ContractTypeInterface {
  title: string;
  duration: number;
  unit: TimeUnitEnum;
}

interface DataType {
  id: string;
  stt: number;
  key: string;
  title: string;
  duration: number;
  unit: React.ReactNode;
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
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Thời hạn hợp đồng",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Đơn vị thời gian",
    dataIndex: "unit",
    key: "unit",
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

const ContractType = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [formRef] = Form.useForm<ContractTypeInterface>();

  const { dataContractTypes, dataDetailContractType } = useAppSelector(
    (state) => state.contractTypesSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const timeUnitOptions = [
    { label: "Ngày", value: TimeUnitEnum.DAY },
    { label: "Tháng", value: TimeUnitEnum.MONTH },
    { label: "Năm", value: TimeUnitEnum.YEAR },
  ];

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { title, duration, unit } = dataDetailContractType.data;
      formRef.setFieldsValue({
        title,
        duration,
        unit,
      });
    }
  }, [formAction, dataDetailContractType.data, formRef]);

  useEffect(() => {
    dispatch(getContractTypesAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataContractTypes.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    title:
      item.title?.length > 50 ? `${item.title?.slice(0, 50)}...` : item.title,
    duration: item.duration,
    unit: (item.unit === TimeUnitEnum.DAY && <Tag color="blue">Ngày</Tag>) ||
      (item.unit === TimeUnitEnum.MONTH && <Tag color="purple">Tháng</Tag>) || (
        <Tag color="red">Năm</Tag>
      ),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailContractTypeAction(item._id));
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
        ? "Thêm mới loại hợp đồng thành công."
        : "Cập nhật loại hợp đồng thành công";

    setIsLoading(true);
    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postContractTypeAction({
          title: formRef.getFieldValue("title"),
          duration: Number(formRef.getFieldValue("duration")),
          unit: formRef.getFieldValue("unit"),
        })
      );
    } else {
      response = await dispatch(
        putContractTypeAction({
          id: dataDetailContractType.data?._id,
          title: formRef.getFieldValue("title"),
          duration: Number(formRef.getFieldValue("duration")),
          unit: formRef.getFieldValue("unit"),
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      formRef.resetFields();
      setIsModalOpen(false);
      dispatch(getContractTypesAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteContractTypeAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa loại hợp đồng thành công.");
      setModalDelete(undefined);
      dispatch(getContractTypesAction());
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
        title="Danh sách loại hợp đồng"
        extra={[
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm loại hợp đồng mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataContractTypes.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới loại hợp đồng"
            : "Cập nhật loại hợp đồng"
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
          name="form-contract-type"
          form={formRef}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Thời hạn hợp đồng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thời hạn hợp đồng!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Nhập thời hạn"
                  min={1}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="unit"
                label="Đơn vị thời gian"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đơn vị thời gian!",
                  },
                ]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  options={timeUnitOptions}
                  placeholder="Chọn đơn vị"
                />
              </Form.Item>
            </Col>
          </Row>
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
        <p>Bạn có chắc chắn muốn xóa loại hợp đồng này không?</p>
      </Modal>
    </div>
  );
};

export default ContractType;
