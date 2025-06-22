"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
   const { user, loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!loading && user) {
         const rolePath = `/dashboard/${user.role
            .toLowerCase()
            .replace("_", "-")}`;
         router.push(rolePath);
      }
   }, [user, loading, router]);

   if (loading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Card className="w-96">
               <CardContent className="p-6">
                  <div className="text-center">
                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                     <p className="text-gray-600">
                        Redirecting to your dashboard...
                     </p>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   return null;
}
