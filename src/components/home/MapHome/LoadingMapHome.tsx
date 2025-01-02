import React from "react";

import { Spin } from "antd";
import "./style.scss";

const LoadingMapHome = () => {
  return (
    <div className="wrapper-map-homepage">
      <div className="wrapper-map-homepage-loading">
        <Spin />
      </div>
    </div>
  );
};

export default LoadingMapHome;
