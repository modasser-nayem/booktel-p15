"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { 
  Building, 
  User, 
  Menu, 
  X,
  LogOut,
  LayoutDashboard
} from "lucide-react"
import { toast } from "react-hot-toast"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Booktel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Hotels
            </Link>
            {user && (
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center space-x-2 rounded-full"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </Button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b border-gray-100">
                      {user.name}
                    </div>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="h-3 w-3" />
                      Dashboard
                    </span>
                    </Link>
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <span className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        Profile
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="h-3 w-3" />
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {onMenuClick && (
              <Button variant="ghost" size="icon" onClick={onMenuClick}>
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link href="/hotels" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Hotels
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    <span className="flex items-center gap-2">
                      <LayoutDashboard className="h-3 w-3" />
                      Dashboard
                    </span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard/profile" className="block py-2 text-sm text-gray-700 hover:text-blue-600">
                      <span className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        Profile
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-700"
                    >
                      <span className="flex items-center gap-2"> <LogOut className="h-3 w-3" />Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 