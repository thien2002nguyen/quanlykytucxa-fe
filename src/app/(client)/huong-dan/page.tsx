"use client";

import { Breadcrumb } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { useAppSelector } from "@/store";
import "./style.scss";

const GuidesPage = () => {
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);

  return (
    <div className="wrapper-guides-page">
      <div className="container">
        <div className="wrapper-guides-page-breadcrumb">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: "Hướng dẫn",
              },
            ]}
          />

          <div className="wrapper-guides-page-detail">
            <h4 className="title-detail">Hướng dẫn</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(dataSchool.data?.guidelines || ""),
              }}
              className="sun-editor-editable-override"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
