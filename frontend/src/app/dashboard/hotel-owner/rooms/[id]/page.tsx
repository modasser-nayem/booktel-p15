"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared";
import { 
  Bed, 
  DollarSign, 
  Calendar,
  Edit,
  Trash2,
  ArrowLeft,
  Building,
  Users,
  Eye
} from "lucide-react";
import { roomService, hotelService } from "@/services/api";
import { Room, RoomType, TGetAllHotelsByOwner } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  
  const [room, setRoom] = useState<Room | null>(null);
  const [hotels, setHotels] = useState<TGetAllHotelsByOwner>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [roomResponse, hotelsResponse] = await Promise.all([
          roomService.getRoomDetails(roomId),
          hotelService.getAllHotelsByOwner(),
        ]);

        setRoom(roomResponse.data.data);
        setHotels(hotelsResponse.data.data.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        toast.error("Failed to fetch room details");
        router.push("/dashboard/hotel-owner/rooms");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId, router]);

  const handleDeleteRoom = async () => {
    if (!confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      return;
    }

    try {
      await roomService.deleteRoom(roomId);
      toast.success("Room deleted successfully");
      router.push("/dashboard/hotel-owner/rooms");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  const getRoomTypeColor = (type: RoomType) => {
    switch (type) {
      case "SINGLE":
        return "bg-blue-100 text-blue-800";
      case "DOUBLE":
        return "bg-green-100 text-green-800";
      case "SUITE":
        return "bg-purple-100 text-purple-800";
      case "DELUXE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomTypeLabel = (type: RoomType) => {
    switch (type) {
      case "SINGLE":
        return "Single";
      case "DOUBLE":
        return "Double";
      case "SUITE":
        return "Suite";
      case "DELUXE":
        return "Deluxe";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="text-center py-12">
        <Bed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Room not found</h2>
        <p className="text-gray-600 mb-4">The room you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard/hotel-owner/rooms">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rooms
          </Button>
        </Link>
      </div>
    );
  }

  const hotel = hotels.find(h => h.id === room.hotelId);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${getRoomTypeLabel(room.type)} Room`}
        subtitle={hotel?.name || "Unknown Hotel"}
        showBackButton
        backHref="/dashboard/hotel-owner/rooms"
        actionText="Edit Room"
        actionHref={`/dashboard/hotel-owner/rooms/${room.id}/edit`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Room Images */}
          <Card>
            <CardHeader>
              <CardTitle>Room Images</CardTitle>
            </CardHeader>
            <CardContent>
              {room.photos && room.photos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.photos.map((photo, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg relative">
                      <Image
                        src={photo}
                        alt={`Room ${index + 1}`}
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
                  <Bed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Room Information */}
          <Card>
            <CardHeader>
              <CardTitle>Room Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Bed className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Room Type</p>
                    <p className="text-sm text-gray-600">{getRoomTypeLabel(room.type)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Number of Beds</p>
                    <p className="text-sm text-gray-600">{room.beds} bed{room.beds > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Price per Night</p>
                    <p className="text-sm text-gray-600">${room.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hotel</p>
                    <p className="text-sm text-gray-600">{hotel?.name || "Unknown Hotel"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Available From</p>
                    <p className="text-sm text-gray-600">
                      {new Date(room.availableFrom).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Available To</p>
                    <p className="text-sm text-gray-600">
                      {new Date(room.availableTo).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Room Status */}
          <Card>
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type:</span>
                <Badge className={getRoomTypeColor(room.type)}>
                  {getRoomTypeLabel(room.type)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Price:</span>
                <span className="text-sm font-semibold">${room.price}/night</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Beds:</span>
                <span className="text-sm">{room.beds}</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex space-x-2">
                  <Link href={`/dashboard/hotel-owner/rooms/${room.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={handleDeleteRoom}
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
              <Link href={`/dashboard/hotel-owner/hotels/${room.hotelId}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  View Hotel
                </Button>
              </Link>
              <Link href={`/dashboard/hotel-owner/bookings?room=${room.id}`}>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Bookings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Room Info */}
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2 text-gray-500" />
                <span>Room ID: {room.id}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building className="h-4 w-4 mr-2 text-gray-500" />
                <span>Hotel ID: {room.hotelId}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 