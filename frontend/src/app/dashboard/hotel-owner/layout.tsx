import ProtectedRoute from "@/components/layout/ProtectedRoute";

export default function HotelOwnerLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <ProtectedRoute allowedRoles={["HOTEL_OWNER"]}>{children}</ProtectedRoute>
   );
}
