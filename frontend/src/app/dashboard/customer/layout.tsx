import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function CustomerLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ProtectedRoute allowedRoles={["CUSTOMER"]}>{children}</ProtectedRoute>
   );
}
