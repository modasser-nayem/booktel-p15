"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  UserCheck,
  UserX,
  Hotel,
  Clock,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { hotelService, userService, adminService } from "@/services/api";

interface DashboardStats {
  totalUsers: number;
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingBookings: number;
  completedBookings: number;
}

interface RecentActivity {
  id: string;
  type: "booking" | "user" | "hotel";
  action: string;
  timestamp: string;
  user?: string;
  hotel?: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all data in parallel
        const [usersResponse, hotelsResponse, bookingsResponse] = await Promise.all([
          userService.getAllUsers(),
          hotelService.getAllHotels(),
          adminService.getAllBookings(),
        ]);

        const users = usersResponse.data.data.data;
        const hotels = hotelsResponse.data.data.data;
        const bookings = bookingsResponse.data.data.data;

        // Calculate stats
        const totalRevenue = bookings.filter(b => b.status === "BOOKED").reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
        const activeUsers = 5;
        const inactiveUsers = 15;
        const pendingBookings = bookings.filter(b => b.status === "PENDING").length;
        const completedBookings = bookings.filter(b => b.status === "BOOKED").length;

        setStats({
          totalUsers: users.length,
          totalHotels: hotels.length,
          totalBookings: bookings.length,
          totalRevenue,
          activeUsers,
          inactiveUsers,
          pendingBookings,
          completedBookings,
        });

        // Generate recent activity
        const activity: RecentActivity[] = [];
        
        // Add recent bookings
        bookings.slice(0, 5).forEach(booking => {
          activity.push({
            id: booking.id,
            type: "booking",
            action: `New booking for ${ "Hotel"}`,
            timestamp: booking.createdAt,
            user: "John Doe",
            hotel: "Grand Hotel",
          });
        });

        // Add recent user registrations
        users.slice(0, 3).forEach(user => {
          activity.push({
            id: user.id,
            type: "user",
            action: `New user registered: ${user.name}`,
            timestamp: user.createdAt,
            user: user.name,
          });
        });

        // Add recent hotel additions
        hotels.slice(0, 2).forEach(hotel => {
          activity.push({
            id: hotel.id,
            type: "hotel",
            action: `New hotel added: ${hotel.name}`,
            timestamp: "2025-01-01",
            hotel: hotel.name,
          });
        });

        // Sort by timestamp and take top 10
        activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setRecentActivity(activity.slice(0, 10));

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100 text-sm sm:text-base">Here&apos;s what&apos;s happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
              <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
              <span className="text-green-600">{stats.activeUsers} active</span>
              <span className="mx-2">•</span>
              <UserX className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
              <span className="text-red-600">{stats.inactiveUsers} inactive</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hotels</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalHotels}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
              <Hotel className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Registered properties</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600">{stats.pendingBookings} pending</span>
              <span className="mx-2">•</span>
              <span className="text-green-600">{stats.completedBookings} completed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Platform earnings</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Building className="h-6 w-6" />
              <span>Manage Hotels</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>View Bookings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No recent activity</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">
                    {activity.type === "booking" && (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                    {activity.type === "user" && (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {activity.type === "hotel" && (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()} at{" "}
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
