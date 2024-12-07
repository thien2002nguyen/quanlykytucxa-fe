import { themeAntdClient } from "@/config/theme";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truy cập",
  description: "Ký túc xá",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConfigProvider theme={themeAntdClient}>{children}</ConfigProvider>;
}
