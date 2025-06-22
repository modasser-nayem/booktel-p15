"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Building, 
  Calendar, 
  Home,
  Search,
  Settings,
  BarChart3,
  LogOut,
  X,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
  onClose?: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ className, onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const getNavigationItems = () => {
    const baseItems = [
      {
        href: "/",
        label: "Home",
        icon: Home,
        description: "Go to homepage"
      },
      {
        href: "/dashboard/profile",
        label: "Profile",
        icon: Settings,
        description: "Account settings"
      },
    ]

    switch (user.role) {
      case "ADMIN":
        return [
          ...baseItems,
          {
            href: "/dashboard/admin",
            label: "Dashboard",
            icon: BarChart3,
            description: "Admin overview"
          },
          {
            href: "/dashboard/admin/users",
            label: "Manage Users",
            icon: User,
            description: "User management"
          },
          {
            href: "/dashboard/admin/hotels",
            label: "Manage Hotels",
            icon: Building,
            description: "Hotel management"
          },
          {
            href: "/dashboard/admin/bookings",
            label: "All Bookings",
            icon: Calendar,
            description: "Booking overview"
          },
        ]
      case "HOTEL_OWNER":
        return [
          ...baseItems,
          {
            href: "/dashboard/hotel-owner",
            label: "Dashboard",
            icon: BarChart3,
            description: "Hotel overview"
          },
          {
            href: "/dashboard/hotel-owner/hotels",
            label: "My Hotels",
            icon: Building,
            description: "Manage your hotels"
          },
          {
            href: "/dashboard/hotel-owner/bookings",
            label: "Hotel Bookings",
            icon: Calendar,
            description: "View bookings"
          },
          {
            href: "/dashboard/hotel-owner/rooms",
            label: "Manage Rooms",
            icon: Building,
            description: "Room management"
          },
        ]
      case "CUSTOMER":
        return [
          ...baseItems,
          {
            href: "/hotels",
            label: "Browse Hotels",
            icon: Search,
            description: "Find hotels"
          },
          {
            href: "/dashboard/customer",
            label: "Dashboard",
            icon: BarChart3,
            description: "Your overview"
          },
          {
            href: "/dashboard/customer/bookings",
            label: "My Bookings",
            icon: Calendar,
            description: "Your bookings"
          },

        ]
      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div className={cn(
      "h-full bg-white flex flex-col",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <Building className="h-6 w-6 text-blue-600" />
          {!collapsed && <span className="font-semibold text-gray-900">Booktel</span>}
        </div>
        {/* Mobile close button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className={cn("border-b border-gray-200 flex-shrink-0", collapsed ? "p-2" : "p-4")}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Badge variant="outline" className="text-xs">
              {user.role.replace("_", " ")}
            </Badge>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className={cn("space-y-1", collapsed ? "p-2" : "p-2")}>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center font-medium rounded-md transition-colors",
                  collapsed ? "px-2 py-3 justify-center" : "px-3 py-2 text-sm",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={onClose} // Close sidebar on mobile when clicking a link
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className={cn("border-t border-gray-200 flex-shrink-0", collapsed ? "p-2" : "p-4")}>
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed ? "w-full h-10 p-0 justify-center" : "w-full justify-start"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )
} 