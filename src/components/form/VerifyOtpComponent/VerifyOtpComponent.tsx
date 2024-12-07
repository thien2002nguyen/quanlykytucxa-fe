"use client";

import { useDispatch } from "react-redux";
import { Button, Flex, Form, FormProps, Image, Input } from "antd";
import React, { useState } from "react";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import { ActionAuthUser } from "@/utils/contants";
import { IoIosArrowBack } from "react-icons/io";
import { ParameterVerifyOtp } from "@/store/users/users.type";
import { verifyOtpAction } from "@/store/users/users.action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {
  onChangeTypeForm: (value: ActionAuthUser) => void;
}

const VerifyOtpComponent = ({ onChangeTypeForm }: Props) => {
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish: FormProps<ParameterVerifyOtp>["onFinish"] = async (
    values: ParameterVerifyOtp
  ) => {
    setIsLoading(true);

    const response = await dispatch(
      verifyOtpAction({
        email: searchParams.get("email") as string,
        studentCode: searchParams.get("studentCode") as string,
        otp: values.otp,
      })
    );

    if (response.payload?.error) {
      toast.error(`🦄 ${response.payload?.error}`);
    } else {
      toast.success("🦄 Xác thực OTP thành công.");
      onChangeTypeForm(ActionAuthUser.CHANGE_PASSWORD);
    }

    setIsLoading(false);
  };

  const handleSendOtp = async () => {};

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
        name="form-verify-otp"
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
          <h2>XÁC THỰC MÃ OTP</h2>
        </Flex>

        <Form.Item
          label="Mã OTP của bạn"
          name="otp"
          rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
        >
          <Input.OTP formatter={(str) => str.toUpperCase()} />
        </Form.Item>

        <Flex justify="center" style={{ marginTop: 16 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Xác thực
            </Button>
          </Form.Item>
        </Flex>

        <p className="btn-change-form" onClick={handleSendOtp} aria-hidden>
          Gửi lại mã
        </p>
      </Form>
    </Flex>
  );
};

export default VerifyOtpComponent;
