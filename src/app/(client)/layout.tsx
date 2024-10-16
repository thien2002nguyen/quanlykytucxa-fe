import MainClient from "@/components/client/MainClient/MainClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ - Ký túc xá",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainClient>{children}</MainClient>;
}
