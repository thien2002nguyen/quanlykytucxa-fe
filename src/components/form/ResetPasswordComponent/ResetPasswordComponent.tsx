"use client";

import { useDispatch } from "react-redux";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useState } from "react";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { ActionAuthUser } from "@/utils/contants";
import { IoIosArrowBack } from "react-icons/io";
import { ParameterSendOtp } from "@/store/users/users.type";
import { sendOtpAction } from "@/store/users/users.action";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  onChangeTypeForm: (value: ActionAuthUser) => void;
}

const ResetPasswordComponent = ({ onChangeTypeForm }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const onFinish: FormProps<ParameterSendOtp>["onFinish"] = async (
    values: ParameterSendOtp
  ) => {
    setIsLoading(true);

    const response = await dispatch(sendOtpAction(values));

    if (response.payload?.error) {
      toast.error(`🦄 ${response.payload?.error}`);
    } else {
      toast.success("🦄 OTP đã được gửi tới email của bạn.");
      const queryString = cleanAndSerializeQueryParams({
        email: values.email,
        studentCode: values.studentCode,
      });
      router.replace(`${pathname}?${queryString}`);
      onChangeTypeForm(ActionAuthUser.OTP_AUTHENTICATION);
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
        name="form-reset-password"
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
          <h2>QUÊN MẬT KHẨU</h2>
        </Flex>

        <Form.Item
          label="Mã số sinh viên"
          name="studentCode"
          rules={[
            { required: true, message: "Vui lòng nhập mã số sinh viên!" },
          ]}
        >
          <Input size="large" />
        </Form.Item>

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
          <Input size="large" />
        </Form.Item>

        <Flex justify="center" style={{ marginTop: 16 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Tiếp tục
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default ResetPasswordComponent;
