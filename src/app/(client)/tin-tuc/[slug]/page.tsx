import React from "react";
import DOMPurify from "dompurify";
import { Breadcrumb } from "antd";
import "./style.scss";
import { HomeOutlined } from "@ant-design/icons";
import InfomationAndNews from "@/components/home/InfomationAndNews/InfomationAndNews";
import { JSDOM } from "jsdom";
import { News } from "@/store/news/news.type";
import NotFoundPage from "@/app/not-found";
import { baseURL } from "@/config/axios";

async function getDetailNews(slug: string) {
  const res = await fetch(`${baseURL}/news/${slug}`);
  const dataInfomation: { data: News } = await res.json();
  return dataInfomation.data;
}

const NewsPage = async ({
  params,
}: Readonly<{
  params: { slug: string };
}>) => {
  const dataDetailNews = await getDetailNews(params.slug);

  if (!dataDetailNews) {
    return <NotFoundPage />;
  }

  // DOM nếu đang chạy trên SSR
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const sanitizedContent = purify.sanitize(dataDetailNews?.content || "");

  return (
    <div className="wrapper-news-page">
      <div className="container">
        <div className="wrapper-news-page-breadcrumb">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: dataDetailNews?.title,
              },
            ]}
          />
        </div>

        <div className="wrapper-news-page-detail">
          <h4 className="title-detail">{dataDetailNews?.title}</h4>
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

export default NewsPage;
