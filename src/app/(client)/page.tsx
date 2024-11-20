import BannerHome from "@/components/home/BannerHome/BannerHome";
import IntroductionHome from "@/components/home/IntroductionHome/IntroductionHome";
import Introduction from "@/components/home/IntroductionHome/IntroductionHome";
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
    </div>
  );
};

export default Home;
