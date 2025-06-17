"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const { user, logout, loading } = useAuth();
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      if (!loading && !user) {
         router.push("/login");
      }
   }, [loading, user, router]);

   if (loading || !user) return <div className="p-8">Loading...</div>;

   // Sidebar items per role
   const sidebarItems =
      user.role === "CUSTOMER"
         ? [
              { label: "Dashboard", href: "/dashboard/customer" },
              //   { label: "My Bookings", href: "/dashboard/customer/bookings" },
           ]
         : user.role === "HOTEL_OWNER"
         ? [
              { label: "Dashboard", href: "/dashboard/hotel-owner" },
              //   { label: "Manage Rooms", href: "/dashboard/hotel-owner/rooms" },
           ]
         : [
              { label: "Dashboard", href: "/dashboard/admin" },
              //   { label: "Manage Hotels", href: "/dashboard/admin/hotels" },
              //   { label: "Manage Users", href: "/dashboard/admin/users" },
           ];

   return (
      <div className="flex min-h-screen">
         {/* Sidebar */}
         <aside className="w-64 bg-muted p-4 border-r space-y-6">
            <div className="text-xl font-bold">Booktel</div>
            <nav className="flex flex-col gap-2">
               {sidebarItems.map((item) => (
                  <Link
                     key={item.href}
                     href={item.href}
                     className={`px-3 py-2 rounded-md hover:bg-accent text-left ${
                        pathname === item.href ? "bg-accent font-semibold" : ""
                     }`}
                  >
                     {item.label}
                  </Link>
               ))}
            </nav>
            <Button
               variant="destructive"
               onClick={logout}
               className="w-full"
            >
               Logout
            </Button>
         </aside>

         {/* Main Content */}
         <main className="flex-1 p-6">{children}</main>
      </div>
   );
}
