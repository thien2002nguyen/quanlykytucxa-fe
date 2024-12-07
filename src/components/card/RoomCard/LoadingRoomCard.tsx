import { Card, Skeleton } from "antd";
import React from "react";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const actions: React.ReactNode[] = [
  <PlusCircleOutlined key="register-room" title="Đăng ký phòng" />,
  <InfoCircleOutlined key="see-more" title="Xem phòng" />,
];

const LoadingRoomCard = () => {
  return (
    <Card actions={actions} style={{ minWidth: 150 }}>
      <Skeleton active paragraph={{ rows: 7 }} />
    </Card>
  );
};

export default LoadingRoomCard;
