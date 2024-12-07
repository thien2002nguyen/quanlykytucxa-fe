import React from "react";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
import { IMAGE_NOT_FOUND } from "@/utils/contants";
import "./style.scss";
import { formatVND } from "@/utils/formatMoney";
import Link from "next/link";

interface Props {
  roomName: string;
  thumbnail: string;
  roomType: string;
  roomBlock: string;
  maximumCapacity: number;
  floor: number;
  roomPrice: number;
  roomSlug: string;
  registeredStudents: number;
}

export const RoomCard = ({
  roomName,
  thumbnail,
  roomType,
  roomBlock,
  maximumCapacity = 0,
  floor = 1,
  roomPrice = 0,
  roomSlug,
  registeredStudents = 0,
}: Props) => {
  const actions: React.ReactNode[] = [
    <Link
      href={{
        pathname: `/ky-tuc-xa/phong-ky-tuc-xa/dang-ky-phong`,
        query: {
          slug: roomSlug,
        },
      }}
    >
      Đăng ký <PlusCircleOutlined key="register-room" title="Đăng ký phòng" />
    </Link>,
    <Link
      href={{
        pathname: roomSlug,
      }}
    >
      Chi tiết <InfoCircleOutlined key="see-more" title="Xem phòng" />
    </Link>,
  ];

  return (
    <div className="wrapper-room-card">
      <Card actions={actions} style={{ minWidth: 150 }}>
        <Card.Meta
          title={
            <div className="wrapper-room-card-title">
              {roomName} - Tầng {floor}
            </div>
          }
          description={
            <div className="wrapper-room-card-content">
              <Image src={thumbnail || IMAGE_NOT_FOUND} preview={false} />
              <p>
                <strong>Loại phòng:</strong> {roomType}
              </p>
              <p>
                <strong>Dãy phòng:</strong> {roomBlock}
              </p>
              <p>
                <strong>Sức chứa:</strong> {registeredStudents}/
                {maximumCapacity} người
              </p>
              <p>
                <strong>Giá phòng:</strong> {formatVND(roomPrice)} VNĐ
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default RoomCard;
