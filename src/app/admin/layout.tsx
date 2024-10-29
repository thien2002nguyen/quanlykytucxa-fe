import MainAdmin from "@/components/admin/MainAdmin/MainAdmin";
import type { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "Admin | Quản lý ký túc xá",
  description: "Admin - Quản lý ký túc xá",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainAdmin>{children}</MainAdmin>;
}
