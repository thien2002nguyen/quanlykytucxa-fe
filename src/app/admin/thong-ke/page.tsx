"use client";

import { Card, Flex } from "antd";
import React from "react";
import Title from "antd/es/typography/Title";
import "./style.scss";
import CardLineChart from "@/components/admin/CardLineChart/CardLineChart";

const Dashboard = () => {
  const pageViews = 1200;
  const studentCount = 250;

  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const label = `Lượng truy cập - ${new Date().getFullYear()}`;
  const data = [
    100, 2000, 1800, 2200, 2500, 3000, 2800, 3200, 3500, 3700, 4000, 8200,
  ];

  return (
    <Flex vertical gap={3}>
      <Flex gap={8}>
        <Card
          title={
            <Title level={5} style={{ color: "#fff", marginBottom: 0 }}>
              Số lượt truy cập trang
            </Title>
          }
          bordered={false}
          className="card-dashboard card-views"
        >
          <h2>{pageViews}</h2>
        </Card>
        <Card
          title={
            <Title level={5} style={{ color: "#fff", marginBottom: 0 }}>
              Tổng số sinh viên
            </Title>
          }
          bordered={false}
          className="card-dashboard card-total-students"
        >
          <h2>{studentCount}</h2>
        </Card>
      </Flex>
      <CardLineChart labels={labels} data={data} label={label} />
    </Flex>
  );
};

export default Dashboard;
