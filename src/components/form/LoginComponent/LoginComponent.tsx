"use client";

import { useDispatch } from "react-redux";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { AppDispatch, useAppSelector } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ParameterLogin } from "@/store/auth/auth.type";
import { loginAction } from "@/store/auth/auth.action";
import { ActionAuthUser } from "@/utils/contants";
import "./style.scss";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

interface Props {
  onChangeTypeForm: (value: ActionAuthUser) => void;
}

const LoginComponent = ({ onChangeTypeForm }: Props) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  const onFinish: FormProps<ParameterLogin>["onFinish"] = async (
    values: ParameterLogin
  ) => {
    const response: any = await dispatch(loginAction(values));

    if (response.payload?.error) {
      toast.error(`🦄 ${response.payload?.error}`);
    } else {
      toast.success("🦄 Đăng nhập thành công.", { autoClose: 2000 });

      timeoutIdRef.current = setTimeout(() => {
        router.push("/");
      }, 2000);
    }
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
        name="form-login"
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
              bottom: "0",
              left: "0",
            }}
            href="/"
            icon={<IoIosArrowBack size={32} />}
          />
          <h2>ĐĂNG NHẬP</h2>
        </Flex>

        <Form.Item
          label="Tên đăng nhập"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Flex justify="flex-end">
          <p
            className="btn-forgot-password"
            onClick={() => onChangeTypeForm(ActionAuthUser.RESET_PASSWORD)}
            aria-hidden
          >
            Quên mật khẩu?
          </p>
        </Flex>

        <Flex justify="center" style={{ marginTop: 16 }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Flex>

        <p
          className="btn-change-form"
          onClick={() => onChangeTypeForm(ActionAuthUser.SIGN_UP)}
          aria-hidden
        >
          Bạn chưa có tài khoản?
        </p>
      </Form>
    </Flex>
  );
};

export default LoginComponent;
