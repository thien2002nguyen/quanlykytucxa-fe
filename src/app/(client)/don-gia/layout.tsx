import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đơn giá ký túc xá",
  description: "Đơn giá ký túc xá - Ký túc xá",
};

export default function UnitPriceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
