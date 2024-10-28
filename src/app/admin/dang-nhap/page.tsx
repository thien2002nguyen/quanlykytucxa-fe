"use client";

import { useDispatch } from "react-redux";
import { loginAction } from "@/store/auth-admin/auth-admin.action";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { ParamLogin } from "@/store/auth-admin/auth-admin.type";
import { AppDispatch, useAppSelector } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginAdmin = () => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.authAdminSlice);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const onFinish: FormProps<ParamLogin>["onFinish"] = async (
    values: ParamLogin
  ) => {
    await dispatch(loginAction(values));
    if (error) {
      toast.error(`🦄 ${error}`);
    } else {
      toast.success("🦄 Đăng nhập thành công.", { autoClose: 2000 });

      timeoutIdRef.current = setTimeout(() => {
        router.push("/admin");
      }, 2000);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
      }}
    >
      <Form
        name="form-login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 400 }}
        autoComplete="off"
        layout="vertical"
      >
        <Flex align="center" vertical style={{ marginBottom: 16 }}>
          <Image
            width={150}
            height={150}
            src="/images/favicon.ico"
            preview={false}
          />

          <h2>Admin - Quản lý ký túc xá</h2>
        </Flex>

        <Form.Item
          label="Tên đăng nhập"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Flex justify="center" style={{ marginTop: 32 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
};

export default LoginAdmin;
