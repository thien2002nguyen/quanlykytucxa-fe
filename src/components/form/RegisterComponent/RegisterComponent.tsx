"use client";

import { useDispatch } from "react-redux";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useState } from "react";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { ActionAuthUser } from "@/utils/contants";
import { IoIosArrowBack } from "react-icons/io";
import { ParameterRegister } from "@/store/users/users.type";
import { registerAction } from "@/store/users/users.action";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  onChangeTypeForm: (value: ActionAuthUser) => void;
}

const RegisterComponent = ({ onChangeTypeForm }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const onFinish: FormProps<ParameterRegister>["onFinish"] = async (
    values: ParameterRegister
  ) => {
    setIsLoading(true);

    const response = await dispatch(registerAction(values));

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
        name="form-register"
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
          <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
        </Flex>

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
            size="large"
          />
        </Form.Item>

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
              Đăng ký
            </Button>
          </Form.Item>
        </Flex>

        <p
          className="btn-change-form"
          onClick={() => onChangeTypeForm(ActionAuthUser.SIGN_IN)}
          aria-hidden
        >
          Bạn đã có tài khoản?
        </p>
      </Form>
    </Flex>
  );
};

export default RegisterComponent;
