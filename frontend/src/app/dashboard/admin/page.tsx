"use client";

import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
   const { user } = useAuth();

   if (user?.role !== "ADMIN") {
      return <div>You are not authorized to view this page.</div>;
   }

   return (
      <div>
         <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
         <p className="text-muted-foreground">
            Manage users, hotels, and bookings.
         </p>
      </div>
   );
}
