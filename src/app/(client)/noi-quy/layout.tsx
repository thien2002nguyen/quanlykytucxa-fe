import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nội quy và quy định",
  description: "Nội quy và quy định - Ký túc xá",
};

export default function RulesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
