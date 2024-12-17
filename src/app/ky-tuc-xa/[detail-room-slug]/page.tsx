"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  getDetailRoomAction,
  getRoomsAction,
} from "@/store/rooms/rooms.action";
import { Breadcrumb, Button, Col, Flex, Image, Row } from "antd";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { v4 as uuidv4 } from "uuid";
import DOMPurify from "dompurify";
import {
  AppstoreOutlined,
  HomeOutlined,
  ProductOutlined,
} from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { formatVND } from "@/utils/formatMoney";
import RoomCard from "@/components/card/RoomCard/RoomCard";

const DetailRoomPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);
  const { dataRooms, dataDetailRoom } = useAppSelector(
    (state) => state.roomsSlice
  );

  const listRoomsSameType = dataRooms?.data?.filter(
    (item) => item._id !== dataDetailRoom?.data?._id
  );

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isSeeMore, setIsSeeMore] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDetailRoomAction(params["detail-room-slug"] as string));
  }, [dispatch]);

  useEffect(() => {
    if (
      dataDetailRoom.data &&
      dataDetailRoom.data?.roomTypeId &&
      dataDetailRoom.data?.roomTypeId?._id
    ) {
      dispatch(
        getRoomsAction({ roomTypeId: dataDetailRoom.data?.roomTypeId?._id })
      );
    }
  }, [dataDetailRoom.data]);

  return (
    <div className="wrapper-detail-room-page">
      <Flex
        justify="space-between"
        align="center"
        className="wrapper-detail-room-page-head"
      >
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/ky-tuc-xa/phong-ky-tuc-xa",
              title: (
                <>
                  <AppstoreOutlined />
                  <span>Phòng ký túc xá</span>
                </>
              ),
            },
            {
              title: (
                <>
                  <ProductOutlined />
                  <span>{dataDetailRoom?.data?.roomName}</span>
                </>
              ),
            },
          ]}
        />
      </Flex>

      <p className="room-name-responsive">
        {dataDetailRoom.data?.roomName} - Tầng {dataDetailRoom.data?.floor || 0}
      </p>

      <Row
        gutter={[
          { xs: 16, sm: 0, md: 0, lg: 0, xl: 32 },
          { xs: 8, sm: 8, md: 12, lg: 16, xl: 0 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <div className="wrapper-detail-room-page-list-image">
            {/* List image */}
            <Swiper
              spaceBetween={10}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {dataDetailRoom.data?.images?.map((item) => (
                <SwiperSlide key={uuidv4()} className="item-image">
                  <Image src={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Node list image */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="node-list-image"
            >
              {dataDetailRoom.data?.images?.map((item, index) => (
                <SwiperSlide
                  key={uuidv4()}
                  className={`node-item-image ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  <Image src={item} preview={false} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="wrapper-detail-room-page-description">
            <h4 className="wrapper-detail-room-page-description-title">
              Mô tả
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  dataDetailRoom.data?.description || ""
                ),
              }}
              className={`wrapper-detail-room-page-description-main ${
                isSeeMore ? "show" : ""
              }`}
            />

            <div className="btn-see-more">
              <Button
                type="primary"
                ghost
                size="small"
                onClick={() => setIsSeeMore((prev) => !prev)}
              >
                {isSeeMore ? "Hiển thị thêm" : "Ẩn bớt"}
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <div className="wrapper-detail-room-page-infomation">
            <p className="room-name">
              {dataDetailRoom.data?.roomName} - Tầng{" "}
              {dataDetailRoom.data?.floor || 0}
            </p>
            <p className="room-type">
              <strong>Loại phòng: </strong>
              {dataDetailRoom.data?.roomTypeId?.type}
            </p>
            <p className="room-block">
              <strong>Dãy phòng: </strong>
              {dataDetailRoom.data?.roomBlockId?.name}
            </p>
            <p className="room-maximum">
              <strong>Sức chứa: </strong>
              {dataDetailRoom.data?.registeredStudents || 0}/
              {dataDetailRoom.data?.maximumCapacity || 0} người
            </p>
            <p className="room-price">
              <strong>Giá: </strong>
              {formatVND(dataDetailRoom.data?.roomTypeId?.price || 0)} VNĐ
            </p>

            <strong className="title-room-device">Thiết bị:</strong>
            <div className="room-device">
              {dataDetailRoom.data?.device?.map((item) => (
                <div className="item-device" key={item._id}>
                  <p className="name-device">{item.deviceName}</p>
                  <p className="status-device">
                    <strong>Trạng thái: </strong>
                    {item.status ? "Bình thường" : "Gặp sự cố"}
                  </p>
                  <p className="quantity-device">
                    <strong>Số lượng: </strong> {item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <Button
              type="primary"
              size="large"
              block
              className="btn-register-room"
              href={`/ky-tuc-xa/phong-ky-tuc-xa/dang-ky-phong?roomSlug=${encodeURIComponent(
                dataDetailRoom.data?.roomSlug
              )}&rollBack=${encodeURIComponent(pathname)}`}
              disabled={
                !!dataAuthMeStudent.data?.contractId ||
                !!dataAuthMeStudent.data?.roomId
              }
            >
              Đăng ký ngay
            </Button>
          </div>
        </Col>
      </Row>

      {listRoomsSameType?.length > 0 && (
        <div className="wrapper-detail-room-page-same-type">
          <h4 className="wrapper-detail-room-page-same-type-title">
            Danh sách các phòng tương tự
          </h4>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1, // Tương đương với sm
              },
              576: {
                slidesPerView: 2, // Tương đương với sm
              },
              768: {
                slidesPerView: 2, // Tương đương với md
              },
              992: {
                slidesPerView: 3, // Tương đương với lg
              },
              1200: {
                slidesPerView: 4, // Tương đương với xl
              },
            }}
          >
            {listRoomsSameType?.map((item) => (
              <SwiperSlide key={item._id}>
                <RoomCard
                  key={`room-card-${item._id}`}
                  roomName={item.roomName}
                  thumbnail={item.thumbnail}
                  roomType={item.roomTypeId?.type}
                  roomBlock={item.roomBlockId?.name}
                  floor={item.floor}
                  maximumCapacity={item.maximumCapacity}
                  roomPrice={item.roomTypeId.price}
                  roomSlug={item.roomSlug}
                  registeredStudents={item.registeredStudents}
                  isShowAction={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default DetailRoomPage;
