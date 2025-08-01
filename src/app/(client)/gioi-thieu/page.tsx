import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import "./style.scss";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import { Introduction } from "@/store/introduction/introduction.type";
import { UnitPrice } from "@/store/unit-price/unit-price.type";
import NotFoundPage from "@/app/not-found";

async function getIntroduction() {
  const res = await fetch(`${process.env.INTERNAL_API_URL}/introductions`, {
    cache: "no-store", // Ngăn cache SSR
  });
  const dataIntroduction: { data: Introduction } = await res.json();
  return dataIntroduction.data; // Trả về dữ liệu 'data' từ API
}

async function getUnitPrice() {
  const res = await fetch(`${process.env.INTERNAL_API_URL}/unit-prices`, {
    cache: "no-store", // Ngăn cache SSR
  });
  const dataIntroduction: { data: UnitPrice } = await res.json();
  return dataIntroduction.data; // Trả về dữ liệu 'data' từ API
}

const IntroductionPage = async () => {
  const dataIntroduction = await getIntroduction();
  const dataUnitPrice = await getUnitPrice();

  if (!dataUnitPrice || !dataIntroduction) {
    return <NotFoundPage />;
  }

  // DOM nếu đang chạy trên SSR
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const sanitizedContent = purify.sanitize(dataIntroduction.content || "");

  const dataList = [
    {
      id: uuidv4(),
      link: "/gioi-thieu",
      title: dataIntroduction?.title,
      description: dataIntroduction?.description,
    },
    {
      id: uuidv4(),
      link: "/don-gia",
      title: dataUnitPrice.title,
      description: dataUnitPrice.description,
    },
  ];

  return (
    <div className="wrapper-introduction-page">
      <div className="container">
        <div className="wrapper-unit-price-page-breadcrumb">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: "Ký túc xá DAU",
              },
            ]}
          />
        </div>

        <Row
          gutter={[
            { xs: 0, sm: 0, md: 0, lg: 16, xl: 32 },
            { xs: 8, sm: 12, md: 16, lg: 0, xl: 0 },
          ]}
        >
          <Col xs={24} sm={24} md={24} lg={16} xl={18}>
            <div className="wrapper-introduction-page-left">
              <h3 className="title-introduction">{dataIntroduction?.title}</h3>

              <iframe
                src={dataIntroduction?.youtubeUrl || ""}
                width="100%"
                allow="encrypted-media"
                className="ifram-introduction-page"
                title="Video giới thiệu của Đại học Kiến trúc Đà Nẵng"
              />

              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent,
                }}
                className="sun-editor-editable-override"
              />
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={8} xl={6}>
            <div className="wrapper-introduction-page-right">
              <h3 className="title-list">Thông tin chung</h3>
              <div className="content-list">
                {dataList?.map((item) => (
                  <div
                    key={item.id}
                    className={`item-list ${
                      item.link === "/gioi-thieu" ? "active-item-list" : ""
                    }`}
                  >
                    <Link href={item.link}>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IntroductionPage;
