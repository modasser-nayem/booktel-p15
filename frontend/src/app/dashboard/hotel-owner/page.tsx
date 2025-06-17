"use client";

import { useAuth } from "@/context/AuthContext";

export default function HotelOwnerDashboard() {
   const { user } = useAuth();

   if (user?.role !== "HOTEL_OWNER") {
      return <div>You are not authorized to view this page.</div>;
   }

   return (
      <div>
         <h1 className="text-2xl font-semibold">Hotel Management</h1>
         <p className="text-muted-foreground">
            Manage your hotel listings and rooms.
         </p>
      </div>
   );
}
