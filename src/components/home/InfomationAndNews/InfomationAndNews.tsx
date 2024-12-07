import { Button, Col, Flex, Row } from "antd";
import React from "react";
import "./style.scss";
import { Infomation } from "@/store/infomation/infomation.type";
import { ParameterGet } from "@/utils/contants";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { News } from "@/store/news/news.type";
import { ReadOutlined } from "@ant-design/icons";
import InfomationOrNewsCard from "@/components/card/InfomationOrNewsCard/InfomationOrNewsCard";

// Hàm tách riêng để lấy dữ liệu
async function getInfomation(parameters: ParameterGet) {
  const newParams = cleanAndSerializeQueryParams(parameters);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/infomations?${newParams}`
  );
  const dataInfomation: { data: Infomation[] } = await res.json();
  return dataInfomation.data;
}

async function getNews(parameters: ParameterGet) {
  const newParams = cleanAndSerializeQueryParams(parameters);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news?${newParams}`
  );
  const dataNews: { data: News[] } = await res.json();
  return dataNews.data;
}

const InfomationAndNews = async () => {
  const dataInfomations = await getInfomation({ limit: 5, isClient: true });
  const dataNews = await getNews({ limit: 5, isClient: true });

  return (
    <div className="wrapper-infomation-and-news">
      <div className="container">
        <Row
          gutter={[
            { xs: 16, sm: 0, md: 32, lg: 32, xl: 32 },
            { xs: 16, sm: 32, md: 0, lg: 0, xl: 0 },
          ]}
        >
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="title">
              <Flex justify="space-between" align="center">
                <h3 className="title-text">Thông tin</h3>
                <Button
                  type="text"
                  href="/thong-bao"
                  icon={<ReadOutlined />}
                  className="btn-see-more"
                >
                  Xem tất cả
                </Button>
              </Flex>
            </div>

            <Flex vertical gap={16} className="content">
              {dataInfomations?.map((infomation) => (
                <InfomationOrNewsCard
                  key={infomation._id}
                  title={infomation.title}
                  thumbnail={infomation.image}
                  createdAt={infomation.createdAt}
                  description={infomation.description}
                  slug={infomation.slug}
                  typeCard="thong-tin"
                />
              ))}
            </Flex>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="title">
              <Flex justify="space-between" align="center">
                <h3 className="title-text">Tin tức</h3>

                <Button
                  type="text"
                  href="/tin-tuc"
                  icon={<ReadOutlined />}
                  className="btn-see-more"
                >
                  Xem tất cả
                </Button>
              </Flex>
            </div>

            <Flex vertical gap={16} className="content">
              {dataNews?.map((news) => (
                <InfomationOrNewsCard
                  key={news._id}
                  title={news.title}
                  thumbnail={news.image}
                  createdAt={news.createdAt}
                  description={news.description}
                  slug={news.slug}
                  typeCard="tin-tuc"
                />
              ))}
            </Flex>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InfomationAndNews;
