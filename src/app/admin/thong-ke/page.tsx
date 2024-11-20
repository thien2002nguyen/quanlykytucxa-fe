"use client";

import { Card, Flex } from "antd";
import React, { useEffect } from "react";
import Title from "antd/es/typography/Title";
import "./style.scss";
import CardLineChart from "@/components/admin/CardLineChart/CardLineChart";
import { useAppDispatch, useAppSelector } from "@/store";
import { getVisitsByYearAction } from "@/store/monthly-visits/monthly-visits.action";
import { getTotalStudentsAction } from "@/store/students/students.action";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { dataMonthlyVisit } = useAppSelector(
    (state) => state.monthlyVisitsSlice
  );
  const { dataTotalStudents } = useAppSelector((state) => state.studentsSlice);

  const year = new Date().getFullYear();

  useEffect(() => {
    dispatch(getVisitsByYearAction(year));
    dispatch(getTotalStudentsAction());
  }, [dispatch]);

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
  const label = `Lượng truy cập - ${year}`;
  const data = dataMonthlyVisit?.data?.map((mv) => mv.visitCount);

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
          <h2>{dataMonthlyVisit.totalVisits}</h2>
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
          <h2>{dataTotalStudents.data}</h2>
        </Card>
      </Flex>
      <CardLineChart labels={labels} data={data} label={label} />
    </Flex>
  );
};

export default Dashboard;
