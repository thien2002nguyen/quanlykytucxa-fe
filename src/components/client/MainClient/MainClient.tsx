import React from "react";
import HeaderClient from "../HeaderClient/HeaderClient";
import FooterClient from "../FooterClient/FooterClient";
import "./style.scss";

const MainClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>
        <HeaderClient />
      </header>
      <main>{children}</main>
      <footer>
        <FooterClient />
      </footer>
    </>
  );
};

export default MainClient;
