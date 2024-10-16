import React from "react";
import HeaderClient from "../HeaderClient/HeaderClient";
import FooterClient from "../FooterClient/FooterClient";

const MainClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderClient />
      <main>{children}</main>
      <FooterClient />
    </>
  );
};

export default MainClient;
