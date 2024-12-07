import React from "react";

import "./style.scss";
import { Spin } from "antd";

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
