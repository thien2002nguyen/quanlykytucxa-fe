"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import TextEditor from "@/components/admin/TextEditor/TextEditor";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getIntroductionAction,
  patchIntroductionAction,
} from "@/store/introduction/introduction.action";
import { isContentValid } from "@/utils/contentValidator";
import { Button, Flex, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";

interface IntroductionInterface {
  title: string;
  description: string;
  youtubeUrl: string;
  content: string;
}

const Introduction = () => {
  const [formRef] = Form.useForm<IntroductionInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const { dataIntroduction } = useAppSelector(
    (state) => state.introductionSlice
  );
  const dispatch = useAppDispatch();

  const [content, setContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getIntroductionAction());
  }, [dispatch]);

  useEffect(() => {
    onReset();
  }, [dataIntroduction?.data]);

  const onFinish = async (values: IntroductionInterface) => {
    const isContent = isContentValid(content);

    if (!isContent) {
      messageApi.warning("Vui lòng nhập nội dung.");
      return;
    }

    setIsLoading(true);

    const response = await dispatch(
      patchIntroductionAction({
        title: values.title,
        description: values.description,
        youtubeUrl: values.youtubeUrl,
        content,
      })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Cập nhật thông tin thành công.");
      dispatch(getIntroductionAction());
    }

    setIsLoading(false);
  };

  const onReset = () => {
    const {
      title = "",
      youtubeUrl = "",
      description = "",
      content = "",
    } = dataIntroduction?.data || {};

    formRef.setFieldsValue({
      title,
      youtubeUrl,
      description,
    });

    setContent(content);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent title="Thông tin giới thiệu" />

      <Form
        name="form-introduction"
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
          label="Đường dẫn youtube"
          name="youtubeUrl"
          rules={[
            { required: true, message: "Vui lòng nhập đường dẫn youtube!" },
          ]}
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
