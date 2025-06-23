"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

interface DashboardLayoutProps {
   children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

   return (
      <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER", "HOTEL_OWNER"]}>
         <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
               <div
                  className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
               />
            )}

            {/* Sidebar */}
            <div
               className={`
            fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out
            ${
               sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
            }
            ${sidebarCollapsed ? "lg:w-16" : "w-64"}
         `}
            >
               <Sidebar
                  onClose={() => setSidebarOpen(false)}
                  collapsed={sidebarCollapsed}
                  onToggleCollapse={() =>
                     setSidebarCollapsed(!sidebarCollapsed)
                  }
               />
            </div>

            {/* Main Content */}
            <div
               className={`transition-all duration-300 ${
                  sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
               }`}
            >
               {/* Mobile Header */}
               <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setSidebarOpen(true)}
                     className="h-10 w-10"
                  >
                     <Menu className="h-5 w-5" />
                  </Button>
                  <h1 className="text-lg font-semibold text-gray-900">
                     Dashboard
                  </h1>
                  <div className="w-10" />
               </div>

               {/* Desktop Header */}
               <div className="hidden lg:flex sticky top-0 z-40 items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-4">
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="h-10 w-10"
                     >
                        {sidebarCollapsed ? (
                           <Menu className="h-5 w-5" />
                        ) : (
                           <X className="h-5 w-5" />
                        )}
                     </Button>
                     <h1 className="text-lg font-semibold text-gray-900">
                        Dashboard
                     </h1>
                  </div>
               </div>

               <main className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4rem)]">
                  <div className="p-4 sm:p-6 lg:p-8">
                     <div className="max-w-7xl mx-auto">{children}</div>
                  </div>
               </main>
            </div>
         </div>
      </ProtectedRoute>
   );
}
