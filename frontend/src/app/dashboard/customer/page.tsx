"use client";

import { useAuth } from "@/context/AuthContext";

export default function CustomerDashboard() {
   const { user } = useAuth();

   return (
      <div>
         <h1 className="text-2xl font-semibold">Welcome {user?.name}!</h1>
         <p className="text-muted-foreground">
            This is your customer dashboard.
         </p>
      </div>
   );
}
