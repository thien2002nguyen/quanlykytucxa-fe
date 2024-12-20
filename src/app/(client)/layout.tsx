import BubbleButton from "@/components/client/BubbleButton/BubbleButton";
import MainClient from "@/components/client/MainClient/MainClient";
import { themeAntdClient } from "@/config/theme";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ - Ký túc xá",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={themeAntdClient}>
      <MainClient>{children}</MainClient>
      <BubbleButton />
    </ConfigProvider>
  );
}
