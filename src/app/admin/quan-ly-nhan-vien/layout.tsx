import ProtectedRoute from "@/components/admin/ProtectedRoute/ProtectedRoute";
import { RoleAdmin } from "@/store/auth-admin/auth-admin.type";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute requiredRole={RoleAdmin.ADMIN}>{children}</ProtectedRoute>
  );
}
