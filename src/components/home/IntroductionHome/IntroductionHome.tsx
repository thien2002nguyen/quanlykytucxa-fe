import { Col, Flex, Row } from "antd";
import Link from "next/link";
import React from "react";
import "./style.scss";
import { baseURL } from "@/config/axios";

// Định nghĩa kiểu dữ liệu Introduction
export type Introduction = {
  _id: string;
  slug: string;
  content: string;
  createdAt: string;
  description: string;
  youtubeUrl: string;
  title: string;
  updatedAt: string;
};

async function getIntroduction() {
  const res = await fetch(`${baseURL}/api/introductions`);
  const dataIntroduction: { data: Introduction } = await res.json();
  return dataIntroduction.data; // Trả về dữ liệu 'data' từ API
}

const IntroductionHome = async () => {
  // Gọi hàm getIntroduction để lấy dữ liệu

  const dataIntroduction = await getIntroduction();

  return (
    <div className="wrapper-introduction-home">
      <Row
        gutter={[
          { sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, lg: 24 },
        ]}
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <iframe
            src={dataIntroduction?.youtubeUrl || ""}
            width="100%"
            allow="encrypted-media"
            className="ifram-video-introduction"
            title="Video giới thiệu của Đại học Kiến trúc Đà Nẵng"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Flex vertical align="center" gap={16}>
            <h2>{dataIntroduction?.title}</h2>
            <p>{dataIntroduction?.description}</p>
            <Link
              className="btn-see-more"
              href={{
                pathname: "/gioi-thieu",
                query: { type: "ky-tuc-xa-dau" },
              }}
            >
              Xem thêm
            </Link>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default IntroductionHome;
