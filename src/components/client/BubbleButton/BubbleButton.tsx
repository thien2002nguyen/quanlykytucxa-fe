"use client";

import React, { useState, useEffect } from "react";
import { FloatButton, message } from "antd";
import { PhoneOutlined, MailOutlined, WechatOutlined } from "@ant-design/icons";

import { IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store";
import { getSchoolAction } from "@/store/school/school.action";

const BubbleButton = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(true);
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    dispatch(getSchoolAction());
  }, [dispatch]);

  // Hiển thị nút cuộn lên khi cuộn qua 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isClient) {
    return null;
  }

  return (
    <>
      {contextHolder}

      <div>
        {/* Nút hành động */}
        <FloatButton.Group
          shape="circle"
          style={{
            right: 20,
            bottom: 20,
          }}
        >
          {/* Nút cuộn lên đầu */}
          {isVisible && (
            <FloatButton
              type="primary"
              icon={<IoIosArrowUp />}
              tooltip="Lên đầu trang"
              style={{ right: 20, bottom: 100 }}
              onClick={scrollToTop}
            />
          )}

          <FloatButton
            type="primary"
            icon={<PhoneOutlined />}
            tooltip="Gọi điện thoại"
            onClick={() => {
              const phoneNumber = dataSchool.data?.phoneNumber;
              if (!phoneNumber) {
                messageApi.info("Số điện thoại chưa được cập nhật.");
                return;
              }
              window.open(`tel:${phoneNumber}`, "_blank");
            }}
          />

          <FloatButton
            type="primary"
            icon={<MailOutlined />}
            tooltip="Gửi email"
            onClick={() => {
              const email = dataSchool.data?.email;
              if (!email) {
                messageApi.info("Email chưa được cập nhật.");
                return;
              }
              window.open(`mailto:${email}`, "_blank");
            }}
          />

          <FloatButton
            type="primary"
            icon={<WechatOutlined />}
            tooltip="Zalo"
            onClick={() => {
              const zalo = dataSchool.data?.zaloUrl;
              if (!zalo) {
                messageApi.info("Đường dẫn Zalo chưa được cập nhật.");
                return;
              }
              window.open(`${zalo}`, "_blank");
            }}
          />
        </FloatButton.Group>
      </div>
    </>
  );
};

export default BubbleButton;
