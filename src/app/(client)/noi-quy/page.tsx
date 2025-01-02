"use client";

import { Breadcrumb } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { useAppSelector } from "@/store";
import "./style.scss";

const RulesPage = () => {
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);

  return (
    <div className="wrapper-rules-page">
      <div className="container">
        <div className="wrapper-rules-page-breadcrumb">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: "Nội quy - quy định",
              },
            ]}
          />

          <div className="wrapper-rules-page-detail">
            <h4 className="title-detail">Nội quy - Quy định Ký túc xá</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  dataSchool.data?.rulesAndRegulations || ""
                ),
              }}
              className="sun-editor-editable-override"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
