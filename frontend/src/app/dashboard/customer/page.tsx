"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Building,
  Eye,
  Plus
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/api";
import { TGetBookings } from "@/types";

interface CustomerStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalSpent: number;
}

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<TGetBookings>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getMyBookings();
        setBookings(response.data.data.data || []);
        
        // Calculate stats
        const totalSpent = response.data.data.data?.reduce((sum: number, booking) => 
          sum + (booking.totalPrice || 0), 0) || 0;
        const completedBookings = response.data.data.data?.filter((b) => b.status === "BOOKED").length || 0;
        const pendingBookings = response.data.data.data?.filter((b) => b.status === "PENDING").length || 0;
        const cancelledBookings = response.data.data.data?.filter((b) => b.status === "CANCELLED").length || 0;

        setStats({
          totalBookings: response.data.data.data?.length || 0,
          completedBookings,
          pendingBookings,
          cancelledBookings,
          totalSpent,
        });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100 text-sm sm:text-base">Here&apos;s an overview of your bookings and travel history.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
              <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>All time bookings</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
              </div>
              <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-green-600">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Successful stays</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-yellow-600">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Upcoming trips</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-purple-600">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Lifetime spending</span>
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
              <Plus className="h-6 w-6" />
              <span>Book a Hotel</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Eye className="h-6 w-6" />
              <span>View Bookings</span>
            </Button>
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <MapPin className="h-6 w-6" />
              <span>Explore Hotels</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No bookings found</p>
              <p className="text-sm">Start by booking your first hotel!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Hotel
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(booking.fromDate).toLocaleDateString()} - {new Date(booking.toDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Badge 
                      className={`text-xs ${getStatusColor(booking.status.toLowerCase())}`}
                    >
                      {getStatusIcon(booking.status.toLowerCase())}
                      <span className="ml-1">{booking.status}</span>
                    </Badge>
                    <p className="text-sm font-medium text-gray-900">
                      ${booking.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
