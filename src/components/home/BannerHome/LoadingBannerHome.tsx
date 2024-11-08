import React from "react";

import "./style.scss";
import { Spin } from "antd";

const LoadingBannerHome = () => {
  return (
    <div className="wrapper-banner-homepage">
      <div className="wrapper-banner-homepage-loading">
        <Spin />
      </div>
    </div>
  );
};

export default LoadingBannerHome;
