"use client";

import React, { useEffect, useState } from "react";
import LoadingMapHome from "./LoadingMapHome";
import { useAppSelector } from "@/store";
import "./style.scss";

const MapHome = () => {
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);

  const [isClient, setIsClient] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(false);
  }, [isClient]);

  if (isClient) {
    return <LoadingMapHome />;
  }

  return (
    <div className="wrapper-map-homepage">
      <iframe
        src={dataSchool.data?.googleMapUrl}
        width="100%"
        allow="encrypted-media"
        className="ifram-google-map"
        title="Vị trí của Trường đại học kiến trúc Đà Nẵng"
      />
    </div>
  );
};

export default MapHome;
