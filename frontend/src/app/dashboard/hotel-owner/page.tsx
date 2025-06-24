/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Users,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Bed,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { hotelService, bookingService } from "@/services/api";
import Link from "next/link";

interface HotelOwnerStats {
  totalHotels: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

interface RecentBooking {
  id: string;
  hotelName: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: string;
  roomType: string;
}

// Dummy data for better UI
const dummyStats: HotelOwnerStats = {
  totalHotels: 4,
  totalBookings: 127,
  totalRevenue: 45600,
  averageRating: 4.7,
  activeBookings: 23,
  completedBookings: 98,
  cancelledBookings: 6,
};

const dummyRecentBookings: RecentBooking[] = [
  {
    id: "1",
    hotelName: "Grand Palace Hotel",
    customerName: "Alice Johnson",
    checkInDate: "2024-07-15",
    checkOutDate: "2024-07-18",
    totalAmount: 450,
    status: "completed",
    roomType: "Deluxe Suite"
  },
  {
    id: "2",
    hotelName: "City Inn",
    customerName: "Bob Smith",
    checkInDate: "2024-07-20",
    checkOutDate: "2024-07-22",
    totalAmount: 280,
    status: "pending",
    roomType: "Double Room"
  },
  {
    id: "3",
    hotelName: "Ocean View Resort",
    customerName: "Charlie Brown",
    checkInDate: "2024-07-25",
    checkOutDate: "2024-07-28",
    totalAmount: 720,
    status: "completed",
    roomType: "Ocean Suite"
  },
  {
    id: "4",
    hotelName: "Mountain Lodge",
    customerName: "Diana Prince",
    checkInDate: "2024-07-30",
    checkOutDate: "2024-08-02",
    totalAmount: 380,
    status: "pending",
    roomType: "Single Room"
  },
  {
    id: "5",
    hotelName: "Grand Palace Hotel",
    customerName: "Eve Wilson",
    checkInDate: "2024-08-05",
    checkOutDate: "2024-08-08",
    totalAmount: 520,
    status: "cancelled",
    roomType: "Executive Suite"
  }
];

export default function HotelOwnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<HotelOwnerStats>(dummyStats);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>(dummyRecentBookings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch hotels and bookings for the hotel owner
        const [hotelsResponse, bookingsResponse] = await Promise.all([
          hotelService.getAllHotelsByOwner(),
          bookingService.getMyBookings(),
        ]);

        const hotels = hotelsResponse.data.data.data || [];
        const bookings = bookingsResponse.data.data.data || [];

        // Calculate stats
        const totalRevenue = bookings.reduce((sum: number, booking: any) => 
          sum + (booking.totalAmount || 0), 0);
        const activeBookings = bookings.filter((b: any) => b.status === "pending").length;
        const completedBookings = bookings.filter((b: any) => b.status === "completed").length;
        const cancelledBookings = bookings.filter((b: any) => b.status === "cancelled").length;
        
        // Calculate average rating from hotels
        const totalRating = hotels.reduce((sum: number, hotel: any) => 
          sum + (hotel.rating || 0), 0);
        const averageRating = hotels.length > 0 ? totalRating / hotels.length : 0;

        // Use real data if available, otherwise use dummy data
        if (hotels.length > 0 || bookings.length > 0) {
          setStats({
            totalHotels: hotels.length,
            totalBookings: bookings.length,
            totalRevenue,
            averageRating: Math.round(averageRating * 10) / 10,
            activeBookings,
            completedBookings,
            cancelledBookings,
          });

          // Set recent bookings
          const recent = bookings.slice(0, 5).map((booking: any) => ({
            id: booking.id,
            hotelName: booking.hotelName || "Hotel",
            customerName: booking.customerName || "Customer",
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            totalAmount: booking.totalAmount || 0,
            status: booking.status,
            roomType: booking.roomType || "Room",
          }));

          setRecentBookings(recent);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Keep dummy data on error
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
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, {user?.name || "Hotel Owner"}!</h1>
        <p className="text-green-100 text-sm sm:text-base">Here&apos;s how your hotels are performing today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="hover:shadow-md transition-shadow">
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
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Your properties</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
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
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600">{stats.activeBookings} active</span>
              <span className="mx-2">•</span>
              <span className="text-green-600">{stats.completedBookings} completed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-purple-600">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Lifetime earnings</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-yellow-600">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>Customer satisfaction</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/hotel-owner/hotels/new">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 w-full">
                <Plus className="h-6 w-6" />
                <span>Add Hotel</span>
              </Button>
            </Link>
            <Link href="/dashboard/hotel-owner/bookings">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 w-full">
                <Eye className="h-6 w-6" />
                <span>View Bookings</span>
              </Button>
            </Link>
            <Link href="/dashboard/hotel-owner/hotels">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 w-full">
                <Building className="h-6 w-6" />
                <span>Manage Hotels</span>
              </Button>
            </Link>
            <Link href="/dashboard/hotel-owner/rooms">
              <Button className="h-auto p-4 flex flex-col items-center space-y-2 w-full">
                <Bed className="h-6 w-6" />
                <span>Manage Rooms</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link href="/dashboard/hotel-owner/bookings">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No bookings found</p>
              <p className="text-sm">Bookings will appear here once customers make reservations.</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {booking.customerName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">{booking.roomType} • {booking.hotelName}</p>
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
                      ${booking.totalAmount}
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
