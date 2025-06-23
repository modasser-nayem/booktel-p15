"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/types";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ProtectedRouteProps {
   allowedRoles?: User["role"][]; // Optional: allow specific roles
   children: React.ReactNode;
}

export default function ProtectedRoute({
   allowedRoles,
   children,
}: ProtectedRouteProps) {
   const { user, loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading) {
         if (!user) {
            router.push("/login");
         } else if (
            allowedRoles &&
            !allowedRoles.includes(user.role as User["role"])
         ) {
            router.push("/unauthorized"); // Create this route to show a 403 error
         }
      }
   }, [user, loading, allowedRoles, router]);

   if (loading || !user) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
         </div>
      );
   }

   return <>{children}</>;
}
