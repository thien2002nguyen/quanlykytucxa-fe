import ProtectedRoute from "@/components/admin/ProtectedRoute/ProtectedRoute";
import { RoleAuth } from "@/store/auth/auth.type";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requiredRole={RoleAuth.ADMIN}>{children}</ProtectedRoute>
  );
}
