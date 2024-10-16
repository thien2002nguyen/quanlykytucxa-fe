import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Đăng nhập",
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
  return <div>{children}</div>;
}
