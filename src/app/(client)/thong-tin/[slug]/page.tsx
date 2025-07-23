import React from "react";
import DOMPurify from "dompurify";
import { Breadcrumb } from "antd";
import "./style.scss";
import { HomeOutlined } from "@ant-design/icons";
import { Infomation } from "@/store/infomation/infomation.type";
import InfomationAndNews from "@/components/home/InfomationAndNews/InfomationAndNews";
import { JSDOM } from "jsdom";

async function getDetailInfomation(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/infomations/${slug}`
  );
  const dataInfomation: { data: Infomation } = await res.json();
  return dataInfomation.data;
}

const InfomationPage = async ({
  params,
}: Readonly<{
  params: { slug: string };
}>) => {
  const dataDetailInfomation = await getDetailInfomation(params.slug);

  // DOM nếu đang chạy trên SSR
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const sanitizedContent = purify.sanitize(dataDetailInfomation?.content || "");

  return (
    <div className="wrapper-infomation-page">
      <div className="container">
        <div className="wrapper-infomation-page-breadcrumb">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: dataDetailInfomation?.title,
              },
            ]}
          />
        </div>

        <div className="wrapper-infomation-page-detail">
          <h4 className="title-detail">{dataDetailInfomation?.title}</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
            className="sun-editor-editable-override"
          />
        </div>
      </div>

      <InfomationAndNews />
    </div>
  );
};

export default InfomationPage;
