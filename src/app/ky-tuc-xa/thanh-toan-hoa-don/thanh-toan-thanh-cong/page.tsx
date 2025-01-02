"use client";

import React, { useEffect, useState } from "react";
import { Result, Button, Flex } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { checkStatusPaymentMomoAction } from "@/store/payments/payments.action";
import { useAppDispatch } from "@/store";
import { HomeOutlined } from "@ant-design/icons";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Trạng thái giao dịch
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      handleCheckStatusPayment(orderId);
    } else {
      router.push("/ky-tuc-xa/thanh-toan-hoa-don");
    }
  }, [searchParams]);

  const handleCheckStatusPayment = async (orderId: string) => {
    const response = await dispatch(checkStatusPaymentMomoAction({ orderId }));

    if (response.payload?.data?.resultCode !== 0) {
      setStatus("error");
      setErrorMessage(response.payload?.data?.message || "Đã xảy ra lỗi.");
    } else {
      setStatus("success");
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", height: "100%" }}
    >
      {status === "success" ? (
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle={
            <>
              <p>Giao dịch đã được xử lý thành công.</p>
              <small>
                Nếu có thắc mắc hoặc sai sót về thanh toán, vui lòng liên hệ Ban
                Quản lý Ký túc xá để được giải quyết.
              </small>
            </>
          }
          extra={[
            <Button type="primary" key="home" href="/" icon={<HomeOutlined />}>
              Quay lại trang chủ
            </Button>,
          ]}
        />
      ) : status === "error" ? (
        <Result
          status="error"
          title="Thanh toán thất bại!"
          subTitle={errorMessage || "Đã xảy ra lỗi trong quá trình thanh toán."}
          extra={[
            <Button type="primary" key="home" href="/" icon={<HomeOutlined />}>
              Quay lại trang chủ
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="info"
          title="Đang xử lý thanh toán..."
          subTitle="Vui lòng chờ trong giây lát, chúng tôi đang kiểm tra trạng thái thanh toán của bạn."
        />
      )}
    </Flex>
  );
};

export default PaymentSuccess;
