"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, FilterBar, Pagination, EmptyState } from "@/components/shared";
import { 
  Bed, 
  Edit, 
  Trash2, 
  Eye, 
  Building, 
  Users,
  DollarSign,
} from "lucide-react";
import { roomService, hotelService } from "@/services/api";
import { Room,  TGetAllHotelsByOwner } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

// Extended Room type for UI with hotel info and extra UI fields
interface RoomWithHotel extends Room {
  hotel: {
    id: string;
    name: string;
  };
  name?: string; // UI only
  description?: string; // UI only
  amenities?: string[]; // UI only
  status?: string; // UI only
  capacity?: number; // UI only
}

// Dummy data for better UI demonstration
const dummyRooms: RoomWithHotel[] = [
  {
    id: "1",
    hotelId: "1",
    type: "DELUXE",
    price: 299,
    beds: 2,
    photos: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "1",
      name: "Grand Palace Hotel"
    },
    name: "Deluxe Suite",
    description: "Spacious suite with city views, king bed, and luxury amenities.",
    amenities: ["WiFi", "TV", "Mini Bar", "Room Service", "City View"],
    status: "AVAILABLE",
    capacity: 4
  },
  {
    id: "2",
    hotelId: "2",
    type: "DOUBLE",
    price: 199,
    beds: 1,
    photos: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "2",
      name: "Ocean View Resort"
    },
    name: "Ocean View Room",
    description: "Beautiful room with direct ocean views and balcony access.",
    amenities: ["WiFi", "TV", "Balcony", "Ocean View", "Air Conditioning"],
    status: "AVAILABLE",
    capacity: 2
  },
  {
    id: "3",
    hotelId: "3",
    type: "SUITE",
    price: 149,
    beds: 2,
    photos: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "3",
      name: "Mountain Lodge"
    },
    name: "Mountain Cabin",
    description: "Cozy cabin with rustic charm and mountain views.",
    amenities: ["WiFi", "Fireplace", "Mountain View", "Heating", "Kitchenette"],
    status: "OCCUPIED",
    capacity: 3
  },
  {
    id: "4",
    hotelId: "4",
    type: "SUITE",
    price: 249,
    beds: 1,
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "4",
      name: "City Inn Express"
    },
    name: "Business Suite",
    description: "Professional suite with work area and business amenities.",
    amenities: ["WiFi", "TV", "Work Desk", "Business Center", "Coffee Maker"],
    status: "AVAILABLE",
    capacity: 2
  },
  {
    id: "5",
    hotelId: "1",
    type: "DELUXE",
    price: 179,
    beds: 3,
    photos: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "1",
      name: "Grand Palace Hotel"
    },
    name: "Family Room",
    description: "Large room perfect for families with multiple beds.",
    amenities: ["WiFi", "TV", "Multiple Beds", "Kitchenette", "Play Area"],
    status: "MAINTENANCE",
    capacity: 6
  },
  {
    id: "6",
    hotelId: "1",
    type: "DELUXE",
    price: 599,
    beds: 2,
    photos: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"
    ],
    availableFrom: "2024-01-01",
    availableTo: "2024-12-31",
    hotel: {
      id: "1",
      name: "Grand Palace Hotel"
    },
    name: "Presidential Suite",
    description: "Ultimate luxury with panoramic views and premium services.",
    amenities: ["WiFi", "TV", "Butler Service", "Panoramic View", "Jacuzzi"],
    status: "AVAILABLE",
    capacity: 4
  }
];

export default function HotelOwnerRooms() {
  const [rooms, setRooms] = useState<RoomWithHotel[]>(dummyRooms);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hotels, setHotels] = useState<TGetAllHotelsByOwner>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("_all");
  const [hotelFilter, setHotelFilter] = useState("_all");
  const [priceRange, setPriceRange] = useState("_all");
  const itemsPerPage = 10;

  const fetchHotels = async () => {
    try {
      const response = await hotelService.getAllHotelsByOwner();
      setHotels(response.data.data.data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      // Since there's no getAllRoomsByOwner API, we'll use the dummy data
      // In a real implementation, you might need to fetch rooms from each hotel
      
      // Filter dummy data based on search and filters
      const filtered = dummyRooms.filter((room: RoomWithHotel) => {
        const nameMatch = !searchTerm || room.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = statusFilter === "_all" || room.status === statusFilter;
        const hotelMatch = hotelFilter === "_all" || room.hotel.id === hotelFilter;
        const priceMatch = priceRange === "_all" || 
          (priceRange === "0-100" && room.price <= 100) ||
          (priceRange === "100-200" && room.price > 100 && room.price <= 200) ||
          (priceRange === "200-300" && room.price > 200 && room.price <= 300) ||
          (priceRange === "300+" && room.price > 300);
        return nameMatch && statusMatch && hotelMatch && priceMatch;
      });
      
      setRooms(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      setTotalItems(filtered.length);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Failed to fetch rooms");
      // Keep dummy data on error
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, hotelFilter, priceRange, itemsPerPage]);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [currentPage, searchTerm, statusFilter, hotelFilter, priceRange, fetchRooms]);

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await roomService.deleteRoom(roomId);
      toast.success("Room deleted successfully");
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "OCCUPIED":
        return "bg-blue-100 text-blue-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      case "BOOKED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "AVAILABLE", label: "Available" },
        { value: "OCCUPIED", label: "Occupied" },
        { value: "MAINTENANCE", label: "Maintenance" },
        { value: "BOOKED", label: "Booked" },
      ],
      value: statusFilter,
      onValueChange: setStatusFilter,
    },
    {
      key: "hotel",
      label: "Hotel",
      options: [
        { value: "1", label: "Grand Palace Hotel" },
        { value: "2", label: "Ocean View Resort" },
        { value: "3", label: "Mountain Lodge" },
        { value: "4", label: "City Inn Express" },
      ],
      value: hotelFilter,
      onValueChange: setHotelFilter,
    },
    {
      key: "price",
      label: "Price Range",
      options: [
        { value: "0-100", label: "$0 - $100" },
        { value: "100-200", label: "$100 - $200" },
        { value: "200-300", label: "$200 - $300" },
        { value: "300+", label: "$300+" },
      ],
      value: priceRange,
      onValueChange: setPriceRange,
    },
  ];

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("_all");
    setHotelFilter("_all");
    setPriceRange("_all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Rooms"
        subtitle="Manage room inventory across all your hotels"
        actionText="Add Room"
        actionHref="/dashboard/hotel-owner/rooms/new"
      />

      <FilterBar
        searchPlaceholder="Search rooms by name..."
        onSearch={setSearchTerm}
        filters={filterOptions}
        onClearFilters={handleClearFilters}
      />

      {rooms.length === 0 ? (
        <EmptyState
          icon={Bed}
          title="No rooms found"
          description="Get started by adding your first room."
          actionText="Add Room"
          actionHref="/dashboard/hotel-owner/rooms/new"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room: RoomWithHotel) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  {room.photos && room.photos.length > 0 ? (
                    <Image
                      src={room.photos[0]}
                      alt={room.name || ""}
                      fill
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Bed className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(room.status || "")}>
                      {room.status || "Unknown"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      <DollarSign className="h-3 w-3 mr-1" />
                      ${room.price}/night
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{room.name || "Unnamed Room"}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 mr-1" />
                    {room.hotel.name}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {room.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {room.capacity || "Unknown"} guests
                    </div>
                    <div className="flex items-center space-x-1">
                      {room.amenities?.slice(0, 3).map((amenity: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities?.length && room.amenities.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/hotel-owner/rooms/${room.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/hotel-owner/rooms/${room.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${room.price}</p>
                      <p className="text-xs text-gray-500">per night</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}