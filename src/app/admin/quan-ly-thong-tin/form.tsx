import { useAppDispatch, useAppSelector } from "@/store";
import {
  getInfomationsAction,
  postInfomationAction,
  putInfomationAction,
} from "@/store/infomation/infomation.action";
import { FormAction } from "@/utils/contants";
import { Button, Flex, Form, Input, message, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import UploadSingleImage from "@/components/uploads/UploadSingleImage/UploadSingleImage";
import { isContentValid } from "@/utils/contentValidator";
import TextEditor from "@/components/admin/TextEditor/TextEditor";

interface FormProps {
  formAction: FormAction;
  onBack: () => void;
}

interface InfomationInterface {
  title: string;
  description: string;
  image: string;
  content: string;
}

const FormInfomation = ({ formAction, onBack }: FormProps) => {
  const [formRef] = Form.useForm<InfomationInterface>();
  const dispatch = useAppDispatch();
  const { dataDetailInfomation } = useAppSelector(
    (state) => state.infomationSlice
  );

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentFile, setCurrentFile] = useState<UploadFile[]>([]);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { title, description, content, image } = dataDetailInfomation.data;

      formRef.setFieldsValue({
        title,
        description,
      });

      setCurrentFile([
        {
          name: uuidv4(),
          uid: uuidv4(),
          url: image,
          status: "done",
        },
      ]);

      setContent(content);
    } else {
      onReset();
    }
  }, [formRef, dataDetailInfomation?.data]);

  const onFinish = async (values: InfomationInterface) => {
    if (!currentFile?.[0]) {
      messageApi.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    const isContent = isContentValid(content);

    if (!isContent) {
      messageApi.warning("Vui lòng nhập nội dung.");
      return;
    }

    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm thông tin mới thành công."
        : "Cập nhật thông tin thông tin thành công.";

    setIsLoading(true);

    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postInfomationAction({
          title: values.title,
          image: currentFile?.[0]?.url as string,
          description: values.description,
          content,
        })
      );
    } else {
      response = await dispatch(
        putInfomationAction({
          id: dataDetailInfomation.data?._id,
          title: values.title,
          image: currentFile?.[0]?.url as string,
          description: values.description,
          content,
        })
      );
    }

    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success(messageSuccess);
      onReset();
      dispatch(getInfomationsAction({}));
      onBack();
    }

    setIsLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
    setCurrentFile([]);
  };

  return (
    <div>
      {contextHolder}

      <Form
        name="form-infomation"
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

        <Form.Item label="Hình ảnh">
          <UploadSingleImage
            currentFileList={currentFile}
            onChange={setCurrentFile}
            formAction={formAction}
          />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={4} />
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

export default FormInfomation;
