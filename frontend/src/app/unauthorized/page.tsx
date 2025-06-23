"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
   const { user } = useAuth();
   const router = useRouter();
   const [seconds, setSeconds] = useState(5);

   const getRedirectPath = () => {
      switch (user?.role) {
         case "ADMIN":
            return "/dashboard/admin";
         case "CUSTOMER":
            return "/dashboard/customer";
         case "HOTEL_OWNER":
            return "/dashboard/hotel-owner";
         default:
            return "/dashboard";
      }
   };

   const redirectPath = getRedirectPath();

   useEffect(() => {
      if (seconds <= 0) {
         router.push(redirectPath);
      }

      const timer = setTimeout(() => {
         setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
   }, [seconds, router, redirectPath]);

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
         <div className="max-w-md text-center bg-white shadow-md p-8 rounded-xl">
            <h1 className="text-3xl font-semibold text-red-600 mb-4">
               403 - Unauthorized
            </h1>
            <p className="text-gray-700 mb-6">
               {`You don't have permission to access this page.`}
               <br />
               Redirecting to your dashboard in{" "}
               <span className="font-bold">{seconds}</span> seconds...
            </p>
            <button
               onClick={() => router.push(redirectPath)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
               Go to My Dashboard
            </button>
         </div>
      </div>
   );
}
