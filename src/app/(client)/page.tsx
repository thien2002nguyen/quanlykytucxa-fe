import BannerHome from "@/components/home/BannerHome/BannerHome";
import GroupButtonHome from "@/components/home/GroupButtonHome/GroupButtonHome";
import InfomationAndNews from "@/components/home/InfomationAndNews/InfomationAndNews";
import IntroductionHome from "@/components/home/IntroductionHome/IntroductionHome";
import MapHome from "@/components/home/MapHome/MapHome";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <BannerHome />

      <div className="container">
        {/* Giới thiệu */}
        <IntroductionHome />
      </div>

      {/* Các nút thao tác */}
      <GroupButtonHome />

      {/* Thông tin và tin tức*/}
      <InfomationAndNews />

      {/* Map */}
      <MapHome />
    </div>
  );
};

export default Home;
