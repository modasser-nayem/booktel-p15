"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";

export default function PublicRoute({
   children,
}: {
   children: React.ReactNode;
}) {
   const { user, loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading && user) {
         router.push("/dashboard");
      }
   }, [loading, user, router]);

   if (loading)
      return (
         <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
         </div>
      );

   return <>{children}</>;
}
