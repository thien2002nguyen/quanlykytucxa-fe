import UploadSingleImage from "@/components/uploads/UploadSingleImage/UploadSingleImage";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getUsersAction,
  postUserAction,
  putUserAction,
} from "@/store/users/users.action";
import { FormAction } from "@/utils/contants";
import { Button, Col, Flex, Form, Input, message, Row, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  formAction: FormAction;
  onBack: () => void;
}

interface UserInterface {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
}

const FormUser = ({ formAction, onBack }: FormProps) => {
  const [formRef] = Form.useForm<UserInterface>();
  const dispatch = useAppDispatch();
  const { dataDetailUser } = useAppSelector((state) => state.usersSlice);

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentFile, setCurrentFile] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const { userName, email, phoneNumber, avatar } = dataDetailUser.data;

      formRef.setFieldsValue({
        userName,
        email,
        phoneNumber,
      });

      setCurrentFile([
        {
          name: uuidv4(),
          uid: uuidv4(),
          url: avatar,
          status: "done",
        },
      ]);
    } else {
      onReset();
    }
  }, [formRef, dataDetailUser.data]);

  const onFinish = async (values: UserInterface) => {
    if (!currentFile?.[0]) {
      messageApi.warning("Vui lòng chọn avatar.");
      return;
    }

    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm nhân viên mới thành công."
        : "Cập nhật thông tin nhân viên thành công.";

    setIsLoading(true);

    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postUserAction({
          userName: values.userName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          avatar: currentFile?.[0]?.url as string,
        })
      );
    } else {
      response = await dispatch(
        putUserAction({
          id: dataDetailUser.data?._id,
          userName: values.userName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          avatar: currentFile?.[0]?.url as string,
        })
      );
    }

    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success(messageSuccess);
      onReset();
      dispatch(getUsersAction({}));
      onBack();
    }

    setIsLoading(false);
  };

  const onReset = () => {
    setCurrentFile([]);
    formRef.resetFields();
  };

  return (
    <div>
      {contextHolder}

      <Form
        name="form-user"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onReset={onReset}
        autoComplete="off"
        layout="vertical"
        form={formRef}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                {
                  pattern: /^[a-z0-9]+$/,
                  message:
                    "Tên đăng nhập chỉ có thể bao gồm chữ cái không dấu và số, không có khoảng trắng hoặc ký tự đặc biệt!",
                },
              ]}
            >
              <Input
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.toLowerCase();
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ! Vui lòng kiểm tra lại.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
                  pattern: /^(0[3|5|7|8|9][0-9]{8}|01[0-9]{9})$/, // Biểu thức chính quy cho số điện thoại Việt Nam
                  message: "Số điện thoại không hợp lệ! Vui lòng kiểm tra lại.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={
                formAction === FormAction.CREATE ? "Mật khẩu" : "Mật khẩu mới"
              }
              name="password"
              rules={
                formAction === FormAction.CREATE
                  ? [
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                      {
                        min: 8,
                        message: "Tối thiểu 8 kí tự!",
                      },
                    ]
                  : [
                      {
                        min: 8,
                        message: "Tối thiểu 8 kí tự!",
                      },
                    ]
              }
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Ảnh đại diện">
          <UploadSingleImage
            currentFileList={currentFile}
            onChange={setCurrentFile}
            formAction={formAction}
          />
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

export default FormUser;
