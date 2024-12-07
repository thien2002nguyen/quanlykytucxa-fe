import DormitoryClient from "@/components/client/DormitoryClient/DormitoryClient";
import type { Metadata } from "next";
import "./style.scss";

export const metadata: Metadata = {
  title: "Ký túc xá DAU",
  description: "Ký túc xá DAU",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DormitoryClient>{children}</DormitoryClient>;
}
