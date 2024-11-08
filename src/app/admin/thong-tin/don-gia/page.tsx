"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import TextEditor from "@/components/admin/TextEditor/TextEditor";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getUnitPriceAction,
  patchUnitPriceAction,
} from "@/store/unit-price/unit-price.action";
import { isContentValid } from "@/utils/contentValidator";
import { Button, Flex, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

interface UnitPriceInterface {
  title: string;
  description: string;
  content: string;
}

const Introduction = () => {
  const [formRef] = Form.useForm<UnitPriceInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const { dataUnitPrice } = useAppSelector((state) => state.unitPriceSlice);
  const dispatch = useAppDispatch();

  const [content, setContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUnitPriceAction());
  }, [dispatch]);

  useEffect(() => {
    onReset();
  }, [dataUnitPrice.data]);

  const onFinish = async (values: UnitPriceInterface) => {
    const isContent = isContentValid(content);

    if (!isContent) {
      messageApi.warning("Vui lòng nhập nội dung.");
      return;
    }

    setIsLoading(true);

    const response = await dispatch(
      patchUnitPriceAction({
        title: values.title,
        description: values.description,
        content,
      })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Cập nhật thông tin thành công.");
      dispatch(getUnitPriceAction());
    }

    setIsLoading(false);
  };

  const onReset = () => {
    const { title, description, content } = dataUnitPrice.data;

    formRef.setFieldsValue({
      title,
      description,
    });

    setContent(content);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent title="Thông tin đơn giá ký túc xá" />

      <Form
        name="form-unit-price"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onReset={onReset}
        autoComplete="off"
        layout="vertical"
        form={formRef}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả ngắn!" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả..." />
        </Form.Item>

        <Form.Item label="Nội dung">
          <TextEditor value={content} onBlur={setContent} />
        </Form.Item>

        <div className="form-footer">
          <Flex gap={8} justify="flex-end">
            <Button htmlType="reset">Hủy</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Lưu
            </Button>
          </Flex>
        </div>
      </Form>
    </div>
  );
};

export default Introduction;
