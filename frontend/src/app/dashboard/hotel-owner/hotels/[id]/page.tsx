"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import { 
  Building, 
  MapPin, 
  Star, 
  Calendar,
  Edit,
  Trash2,
  ArrowLeft,
  Wifi,
  Car,
  Dumbbell,
  Utensils,
  Coffee,
  Users as UsersIcon,
  Bell,
  Shirt,
  Snowflake,
  Flame,
  Tv,
  Minus,
  Shield,
  Home,
  Mountain,
  Eye,
  Heart,
  Dog
} from "lucide-react";
import { hotelService } from "@/services/api";
import { TGetHotelDetails, HotelStatus } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "WiFi": Wifi,
  "Parking": Car,
  "Swimming Pool": Building,
  "Gym": Dumbbell,
  "Restaurant": Utensils,
  "Bar": Coffee,
  "Spa": Heart,
  "Conference Room": UsersIcon,
  "Room Service": Bell,
  "Laundry": Shirt,
  "Air Conditioning": Snowflake,
  "Heating": Flame,
  "TV": Tv,
  "Mini Bar": Minus,
  "Safe": Shield,
  "Balcony": Home,
  "Ocean View": Eye,
  "Mountain View": Mountain,
  "City View": Eye,
  "Pet Friendly": Dog,
};

// Dummy data fallback for demo/offline
const dummyHotel = {
  id: "1",
  name: "Grand Palace Hotel",
  location: "New York, NY",
  description: "Luxury 5-star hotel in the heart of downtown with stunning city views and world-class amenities.",
  photos: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
  ],
  status: "APPROVED",
  amenities: ["WiFi", "Parking", "Swimming Pool", "Gym", "Restaurant", "Spa"],
  rooms: [
    { id: "r1", name: "Deluxe Suite", type: "DELUXE", price: 299, beds: 2 },
    { id: "r2", name: "Double Room", type: "DOUBLE", price: 199, beds: 1 },
  ],
  rating: 4.7,
  _count: { rooms: 2 },
};

export default function HotelDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params.id as string;
  
  const [hotel, setHotel] = useState<TGetHotelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await hotelService.getHotelDetails(hotelId);
        setHotel(response.data.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        toast.error("Failed to fetch hotel details, showing demo data.");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setHotel(dummyHotel as any); // fallback to dummy
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId, router]);

  const handleDeleteHotel = async () => {
    if (!confirm("Are you sure you want to delete this hotel? This action cannot be undone.")) {
      return;
    }

    try {
      await hotelService.deleteHotel(hotelId);
      toast.success("Hotel deleted successfully");
      router.push("/dashboard/hotel-owner/hotels");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel");
    }
  };

  const getStatusColor = (status: HotelStatus) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="text-center py-12">
        <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Hotel not found</h2>
        <p className="text-gray-600 mb-4">The hotel you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/hotel-owner/hotels">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hotels
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={hotel.name}
        subtitle={hotel.location}
        showBackButton
        backHref="/dashboard/hotel-owner/hotels"
        actionText="Edit Hotel"
        actionHref={`/dashboard/hotel-owner/hotels/${hotel.id}/edit`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hotel Images */}
          <Card>
            <CardHeader>
              <CardTitle>Hotel Images</CardTitle>
            </CardHeader>
            <CardContent>
              {hotel.photos && hotel.photos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.photos.map((photo, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg relative">
                      <Image
                        src={photo}
                        alt={`${hotel.name} - Image ${index + 1}`}
                        fill
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{hotel.description || <span className="italic text-gray-400">No description provided.</span>}</p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              {hotel.amenities && hotel.amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Building;
                    return (
                      <div key={amenity} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status and Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hotel Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge className={getStatusColor(hotel.status)}>
                  {hotel.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Rooms:</span>
                <span className="text-sm">{hotel.rooms?.select ? 1 : 0}</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex space-x-2">
                  <Link href={`/dashboard/hotel-owner/hotels/${hotel.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleDeleteHotel}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href={`/dashboard/hotel-owner/hotels/${hotel.id}/rooms`}>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Manage Rooms
                </Button>
              </Link>
              <Link href={`/dashboard/hotel-owner/bookings?hotel=${hotel.id}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Hotel Info */}
          <Card>
            <CardHeader>
              <CardTitle>Hotel Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Created: {new Date(hotel.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Updated: {new Date(hotel.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 