"use client";

import React from "react";
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

  return (
    <div className="wrapper-footer">
      <div className="container">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <h4>{dataSchool.data?.schoolName}</h4>
            <p>Địa chỉ: {dataSchool.data?.address}</p>
            <p>Điện thoại: {dataSchool.data?.phoneNumber}</p>
            <p>Email: {dataSchool.data?.email}</p>
            <p>Giờ làm việc: {dataSchool.data?.timeWork}</p>
          </Col>
          <Col xs={24} md={6}>
            <h4>Về chúng tôi</h4>
            <p>
              <Link
                href={{
                  pathname: "/gioi-thieu",
                  query: { type: "ky-tuc-xa-dau" },
                }}
              >
                Ký túc xá DAU
              </Link>
            </p>
            <p>
              <Link
                href={{
                  pathname: "/gioi-thieu",
                  query: { type: "don-gia-ky-tuc-xa" },
                }}
              >
                Đơn giá ký túc xá
              </Link>
            </p>
            <p>
              <Link href="/thong-tin">Thông tin</Link>
            </p>
            <p>
              <Link href="/tin-tuc">Tin tức</Link>
            </p>
            <p>
              <Link href="/noi-quy">Nội quy - quy định</Link>
            </p>
            <p>
              <Link href="/huong-dan">Hướng dẫn</Link>
            </p>
          </Col>

          <Col xs={24} md={8}>
            <h4>Fanpage</h4>
            {dataSchool.data?.facebookUrl ? (
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                  dataSchool.data.facebookUrl
                )}&tabs=timeline&width=380&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="130"
                allow="encrypted-media"
                title="Fanpage Facebook của Đại học Kiến trúc Đà Nẵng"
              />
            ) : (
              <p>Không có trang Facebook để hiển thị</p>
            )}

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
