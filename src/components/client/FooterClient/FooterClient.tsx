"use client";

import React, { useEffect } from "react";
import { Row, Col } from "antd";
import "./style.scss";
import { useAppSelector } from "@/store";
import Link from "next/link";
import {
  FacebookOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";

const FooterClient = () => {
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);
  const { dataInfomations } = useAppSelector((state) => state.infomationSlice);
  const { dataNews } = useAppSelector((state) => state.newsSlice);

  return (
    <div className="wrapper-footer">
      <div className="container">
        <Row
          gutter={[
            { xs: 8, sm: 8, md: 8, lg: 12, xl: 16 },
            { xs: 8, sm: 8, md: 8, lg: 12, xl: 16 },
          ]}
        >
          <Col xs={24} sm={14} md={14} lg={10} xl={10}>
            <h4>{dataSchool.data?.schoolName}</h4>
            <p>Địa chỉ: {dataSchool.data?.address}</p>
            <p>Điện thoại: {dataSchool.data?.phoneNumber}</p>
            <p>Email: {dataSchool.data?.email}</p>
            <p>Giờ làm việc: {dataSchool.data?.timeWork}</p>
          </Col>
          <Col xs={12} sm={10} md={10} lg={6} xl={6}>
            <h4>Về chúng tôi</h4>
            <p>
              <Link
                href={{
                  pathname: "/gioi-thieu",
                }}
              >
                Ký túc xá DAU
              </Link>
            </p>
            <p>
              <Link
                href={{
                  pathname: "/don-gia",
                }}
              >
                Đơn giá ký túc xá
              </Link>
            </p>
            <p>
              <Link href={`/thong-tin/${dataInfomations?.data?.[0]?.slug}`}>
                Thông tin
              </Link>
            </p>
            <p>
              <Link href={`/tin-tuc/${dataNews?.data?.[0]?.slug}`}>
                Tin tức
              </Link>
            </p>
            <p>
              <Link href="/noi-quy">Nội quy - quy định</Link>
            </p>
            <p>
              <Link href="/huong-dan">Hướng dẫn</Link>
            </p>
          </Col>

          <Col xs={12} sm={24} md={24} lg={8} xl={8}>
            <h4>Theo dõi chúng tôi</h4>
            <div className="social-links">
              <Link
                href={`${dataSchool.data?.zaloUrl}`}
                className="social-link"
                target="_blank"
              >
                <MessageOutlined
                  style={{ fontSize: "24px", color: "#0084ff" }}
                />
                <span>Zalo</span>
              </Link>

              <Link
                href={`${dataSchool.data?.facebookUrl}`}
                className="social-link"
                target="_blank"
              >
                <FacebookOutlined
                  style={{ fontSize: "24px", color: "#4267B2" }}
                />
                <span>Facebook</span>
              </Link>

              <Link
                href="mailto:ktx@ueh.edu.vn"
                className="social-link"
                target="_blank"
              >
                <MailOutlined style={{ fontSize: "24px", color: "#d44638" }} />
                <span>Email</span>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FooterClient;
