"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHome() {
   const { user, loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading && user) {
         if (user.role === "ADMIN") router.replace("/dashboard/admin");
         else if (user.role === "HOTEL_OWNER")
            router.replace("/dashboard/hotel-owner");
         else if (user.role === "CUSTOMER")
            router.replace("/dashboard/customer");
      }
   }, [user, loading, router]);

   return <div className="p-8">Redirecting to your dashboard...</div>;
}
