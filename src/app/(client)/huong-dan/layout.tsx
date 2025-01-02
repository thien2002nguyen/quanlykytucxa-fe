import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng dẫn",
  description: "Hướng dẫn - Ký túc xá",
};

export default function GuidesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
