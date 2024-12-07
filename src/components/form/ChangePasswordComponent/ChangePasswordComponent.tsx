"use client";

import { useDispatch } from "react-redux";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useState } from "react";
import { AppDispatch, useAppSelector } from "@/store";
import { toast } from "react-toastify";
import { ActionAuthUser } from "@/utils/contants";
import { IoIosArrowBack } from "react-icons/io";
import { ParameterChangePassword } from "@/store/users/users.type";
import { changePasswordAction } from "@/store/users/users.action";
import Link from "next/link";

interface Props {
  onChangeTypeForm: (value: ActionAuthUser) => void;
}

const ChangePasswordComponent = ({ onChangeTypeForm }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dataVerifyOtp } = useAppSelector((state) => state.usersSlice);

  const onFinish: FormProps<ParameterChangePassword>["onFinish"] = async (
    values: ParameterChangePassword
  ) => {
    if (!dataVerifyOtp.data?.otpAccessToken) {
      toast.error("🦄 Đã xảy ra lỗi. Vui lòng thử lại sau");
      return;
    }

    setIsLoading(true);

    const response = await dispatch(
      changePasswordAction({
        otpAccessToken: dataVerifyOtp.data?.otpAccessToken,
        password: values.password,
      })
    );

    if (response.payload?.error) {
      toast.error(`🦄 ${response.payload?.error}`);
    } else {
      toast.success(
        "🦄 Mật khẩu đã được thay đổi. Vui lòng đăng nhập tài khoản."
      );
      onChangeTypeForm(ActionAuthUser.SIGN_IN);
    }

    setIsLoading(false);
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <Form
        name="form-change-password"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 300 }}
        autoComplete="off"
        layout="vertical"
      >
        <Flex
          align="center"
          vertical
          style={{ marginBottom: 16, position: "relative" }}
          gap={8}
        >
          <Link href="/" className="logo-responsive">
            <Image
              width={80}
              height={80}
              src="/images/favicon.ico"
              preview={false}
            />
          </Link>

          <Button
            type="text"
            style={{
              position: "absolute",
              top: "2px",
              left: "0",
            }}
            onClick={() => onChangeTypeForm(ActionAuthUser.SIGN_IN)}
            icon={<IoIosArrowBack size={32} />}
          />
          <h2>ĐẶT MẬT KHẨU MỚI</h2>
        </Flex>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="requirePassword"
          dependencies={["password"]} // Đảm bảo phụ thuộc vào mật khẩu
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Flex justify="center" style={{ marginTop: 16 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Lưu
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default ChangePasswordComponent;
