"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBannersAction } from "@/store/banners/banners.action";
import LoadingBannerHome from "./LoadingBannerHome";

import "./style.scss";
import { IMAGE_NOT_FOUND } from "@/utils/contants";

const BannerHome = () => {
  const { dataBanners } = useAppSelector((state) => state.bannersSlice);
  const [isClient, setIsClient] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBannersAction({ isClient: true }));
  }, [dispatch]);

  useEffect(() => {
    setIsClient(false);
  }, []);

  if (isClient) {
    return <LoadingBannerHome />;
  }

  return (
    <div className="wrapper-banner-homepage">
      <Swiper
        spaceBetween={30}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="wrapper-banner-homepage-swiper"
      >
        {dataBanners?.data?.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="banner-item">
              <Image
                src={banner.url || IMAGE_NOT_FOUND}
                alt="Banner"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerHome;
