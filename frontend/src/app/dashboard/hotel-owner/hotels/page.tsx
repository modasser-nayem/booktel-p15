"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, FilterBar, Pagination, EmptyState } from "@/components/shared";
import { 
  Building, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Star,
  Users,
} from "lucide-react";
import { hotelService } from "@/services/api";
import { TGetAllHotelsByOwner, HotelStatus } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

// Dummy data for better UI demonstration
const dummyHotels: TGetAllHotelsByOwner = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    description: "Luxury 5-star hotel in the heart of downtown with stunning city views and world-class amenities.",
    location: "New York, NY",
    amenities: ["WiFi", "Parking", "Swimming Pool", "Gym", "Restaurant", "Spa"],
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
    ],
    status: "APPROVED",
    _count: { rooms: 45 }
  },
  {
    id: "2",
    name: "Ocean View Resort",
    description: "Beachfront resort offering breathtaking ocean views and direct access to pristine beaches.",
    location: "Miami, FL",
    amenities: ["WiFi", "Parking", "Swimming Pool", "Beach Access", "Restaurant", "Bar"],
    photos: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ],
    status: "APPROVED",
    _count: { rooms: 32 }
  },
  {
    id: "3",
    name: "Mountain Lodge",
    description: "Cozy mountain retreat perfect for nature lovers and adventure seekers.",
    location: "Denver, CO",
    amenities: ["WiFi", "Parking", "Heating", "Restaurant", "Ski Storage"],
    photos: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"
    ],
    status: "PENDING",
    _count: { rooms: 18 }
  },
  {
    id: "4",
    name: "City Inn Express",
    description: "Modern boutique hotel offering comfort and convenience for business and leisure travelers.",
    location: "Chicago, IL",
    amenities: ["WiFi", "Parking", "Business Center", "Restaurant", "Room Service"],
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    status: "APPROVED",
    _count: { rooms: 28 }
  },
  {
    id: "5",
    name: "Heritage Manor",
    description: "Historic hotel with classic architecture and modern amenities in a charming neighborhood.",
    location: "San Francisco, CA",
    amenities: ["WiFi", "Parking", "Restaurant", "Bar", "Conference Room"],
    photos: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
    ],
    status: "REJECTED",
    _count: { rooms: 12 }
  }
];

export default function HotelOwnerHotels() {
  const [hotels, setHotels] = useState<TGetAllHotelsByOwner>(dummyHotels);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("_all");
  const [locationFilter, setLocationFilter] = useState("_all");
  const itemsPerPage = 10;

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      const response = await hotelService.getAllHotelsByOwner({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter === "_all" ? undefined : statusFilter || undefined,
        location: locationFilter === "_all" ? undefined : locationFilter || undefined,
      });

      const { data, meta } = response.data.data;
      // Use real data if available, otherwise keep dummy data
      if (data && data.length > 0) {
        setHotels(data);
        setTotalPages(meta.totalPages);
        setTotalItems(meta.total);
      } else {
        // Filter dummy data based on search and filters
        const filtered = dummyHotels.filter(hotel => {
          const nameMatch = !searchTerm || hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
          const statusMatch = statusFilter === "_all" || hotel.status === statusFilter;
          const locationMatch = locationFilter === "_all" || hotel.location.includes(locationFilter);
          return nameMatch && statusMatch && locationMatch;
        });
        setHotels(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        setTotalItems(filtered.length);
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("Failed to fetch hotels");
      // Keep dummy data on error
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, statusFilter, locationFilter, searchTerm]);

  useEffect(() => {
    fetchHotels();
  }, [currentPage, searchTerm, statusFilter, locationFilter, fetchHotels]);

  const handleDeleteHotel = async (hotelId: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;

    try {
      await hotelService.deleteHotel(hotelId);
      toast.success("Hotel deleted successfully");
      fetchHotels();
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

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "APPROVED", label: "Approved" },
        { value: "REJECTED", label: "Rejected" },
      ],
      value: statusFilter,
      onValueChange: setStatusFilter,
    },
    {
      key: "location",
      label: "Location",
      options: [
        { value: "New York", label: "New York" },
        { value: "Miami", label: "Miami" },
        { value: "Denver", label: "Denver" },
        { value: "Chicago", label: "Chicago" },
        { value: "San Francisco", label: "San Francisco" },
      ],
      value: locationFilter,
      onValueChange: setLocationFilter,
    },
  ];

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("_all");
    setLocationFilter("_all");
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
        title="My Hotels"
        subtitle="Manage your hotel properties"
        actionText="Add Hotel"
        actionHref="/dashboard/hotel-owner/hotels/new"
      />

      <FilterBar
        searchPlaceholder="Search hotels by name..."
        onSearch={setSearchTerm}
        filters={filterOptions}
        onClearFilters={handleClearFilters}
      />

      {hotels.length === 0 ? (
        <EmptyState
          icon={Building}
          title="No hotels found"
          description="Get started by adding your first hotel property."
          actionText="Add Hotel"
          actionHref="/dashboard/hotel-owner/hotels/new"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  {hotel.photos && hotel.photos.length > 0 ? (
                    <Image
                      src={hotel.photos[0]}
                      alt={hotel.name}
                      fill
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='200' y='112.5' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(hotel.status as HotelStatus)}>
                      {hotel.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{hotel.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {hotel._count.rooms} rooms
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      4.5
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/hotel-owner/hotels/${hotel.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/hotel-owner/hotels/${hotel.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteHotel(hotel.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Link href={`/dashboard/hotel-owner/hotels/${hotel.id}/rooms`}>
                      <Button variant="outline" size="sm">
                        Manage Rooms
                      </Button>
                    </Link>
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