"use client";

import { Breadcrumb } from "antd";
import React from "react";
import { FileSyncOutlined, HomeOutlined } from "@ant-design/icons";

const PaymentPage = () => {
  return (
    <div className="wrapper-main-content wrapper-payment-page">
      <div className="wrapper-main-content-head">
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              title: (
                <>
                  <FileSyncOutlined />
                  <span>Thanh toán hóa đơn</span>
                </>
              ),
            },
          ]}
        />
      </div>
      <div className="wrapper-main-content-body"></div>
    </div>
  );
};

export default PaymentPage;
