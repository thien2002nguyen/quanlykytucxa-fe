"use client";

import React, { useEffect, useState } from "react";
import { message, Button, Modal, Space, Table, TableProps, Form } from "antd";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getContractTermsAction,
  deleteContractTermAction,
  getDetailContractTermAction,
  postContractTermAction,
  putContractTermAction,
} from "@/store/contract-terms/contract-terms.action";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { FormAction } from "@/utils/contants";
import TextArea from "antd/es/input/TextArea";

interface ContractTermInterface {
  content: string;
}

interface DataType {
  id: string;
  stt: number;
  key: string;
  content: string;
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
    title: "Điều khoản hợp đồng",
    dataIndex: "content",
    key: "content",
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

const ContractTerm = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [formRef] = Form.useForm<ContractTermInterface>();

  const { dataContractTerms, dataDetailContractTerm } = useAppSelector(
    (state) => state.contractTermsSlice
  );

  const [formAction, setFormAction] = useState<FormAction>(FormAction.CREATE);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { content } = dataDetailContractTerm.data;
      formRef.setFieldsValue({
        content,
      });
    }
  }, [formAction, dataDetailContractTerm.data, formRef]);

  useEffect(() => {
    dispatch(getContractTermsAction());
  }, [dispatch]);

  const dataSource: DataType[] = dataContractTerms.data.map((item, index) => ({
    id: item._id,
    stt: index + 1,
    key: item._id,
    content:
      item.content?.length > 50
        ? `${item.content?.slice(0, 50)}...`
        : item.content,
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            dispatch(getDetailContractTermAction(item._id));
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
        ? "Thêm mới điều khoản hợp đồng thành công."
        : "Cập nhật điều khoản hợp đồng thành công";

    setIsLoading(true);
    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postContractTermAction({
          content: formRef.getFieldValue("content"),
        })
      );
    } else {
      response = await dispatch(
        putContractTermAction({
          id: dataDetailContractTerm.data._id,
          content: formRef.getFieldValue("content"),
        })
      );
    }

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success(messageSuccess);
      formRef.resetFields();
      setIsModalOpen(false);
      dispatch(getContractTermsAction());
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    const response = await dispatch(deleteContractTermAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa điều khoản hợp đồng thành công.");
      setModalDelete(undefined);
      dispatch(getContractTermsAction());
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
        title="Danh sách điều khoản hợp đồng"
        extra={[
          <Button
            type="primary"
            onClick={() => {
              setFormAction(FormAction.CREATE);
              setIsModalOpen(true);
            }}
          >
            Thêm điều khoản hợp đồng mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={false}
        loading={dataContractTerms.loading}
      />

      <Modal
        title={
          formAction === FormAction.CREATE
            ? "Thêm mới điều khoản hợp đồng"
            : "Cập nhật điều khoản hợp đồng"
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
          name="form-contract-term"
          form={formRef}
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="content"
            label="Điều khoản hợp đồng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập điều khoản hợp đồng!",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>
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
        <p>Bạn có chắc chắn muốn xóa điều khoản hợp đồng này không?</p>
      </Modal>
    </div>
  );
};

export default ContractTerm;
