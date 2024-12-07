"use client";

import React, { useEffect, useState } from "react";
import { Button, Col, Flex, Image, Modal, Row, Skeleton } from "antd";
import "./style.scss";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";

const GroupButtonHome = () => {
  const router = useRouter();

  const [isClient, setIsClient] = useState<boolean>(true);
  const [isShowNotificationRequiredLogin, setIsShowNotificationRequiredLogin] =
    useState<boolean>(false);
  const { user } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    setIsClient(false);
  }, []);

  if (isClient) {
    return (
      <div className="wrapper-group-button">
        <div className="container">
          <Skeleton paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  }

  const handleNavigation = (link: string) => {
    if (!user._id) {
      setIsShowNotificationRequiredLogin(true);
      return;
    }

    router.push(`/ky-tuc-xa/${link}`);
  };

  return (
    <div className="wrapper-group-button">
      <div className="container">
        <h3 className="list-title">Ký túc xá</h3>
        <Row
          gutter={[
            { xs: 12, sm: 36, md: 54, lg: 76, xl: 100 },
            { xs: 12, sm: 0, md: 0, lg: 0, xl: 0 },
          ]}
          className="list-button"
        >
          <Col xs={12} sm={8} md={8} lg={8} xl={8}>
            <Button
              onClick={() => handleNavigation("lich-su-thanh-toan")}
              size="large"
              type="primary"
              className="btn-item"
              block
            >
              Thanh toán hóa đơn
            </Button>
          </Col>

          <Col xs={12} sm={8} md={8} lg={8} xl={8}>
            <Button
              onClick={() => handleNavigation("phong-ky-tuc-xa")}
              size="large"
              type="primary"
              className="btn-item center"
              block
            >
              Đăng ký ký túc xá
            </Button>
          </Col>

          <Col xs={12} sm={8} md={8} lg={8} xl={8}>
            <Button
              onClick={() => handleNavigation("dich-vu-phong")}
              size="large"
              type="primary"
              className="btn-item"
              block
            >
              Đăng ký dịch vụ phòng
            </Button>
          </Col>
        </Row>
      </div>

      <Modal
        title={
          <Flex
            justify="center"
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            Yêu cầu đăng nhập
          </Flex>
        }
        open={isShowNotificationRequiredLogin}
        onCancel={() => setIsShowNotificationRequiredLogin(false)}
        centered
        footer={
          <Flex justify="center" gap={16}>
            <Button onClick={() => setIsShowNotificationRequiredLogin(false)}>
              Để sau
            </Button>
            <Button
              type="primary"
              href="/truy-cap"
              onClick={() => {
                setIsShowNotificationRequiredLogin(false);
              }}
            >
              Đăng nhập
            </Button>
          </Flex>
        }
      >
        <Flex vertical align="center">
          <Image src="/images/login_now.jpg" width={140} preview={false} />
          <p>Bạn cần đăng nhập để tiếp tục!</p>
        </Flex>
      </Modal>
    </div>
  );
};

export default GroupButtonHome;
