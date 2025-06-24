"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader, FilterBar, Pagination, EmptyState } from "@/components/shared";
import { Calendar, Bed, DollarSign, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import Link from "next/link";

// Dummy data for UI
const dummyBookings = Array.from({ length: 17 }).map((_, i) => ({
  id: `booking-${i + 1}`,
  hotelName: ["Grand Palace", "City Inn", "Ocean View", "Mountain Lodge"][i % 4],
  roomType: ["Single", "Double", "Suite", "Deluxe"][i % 4],
  customerName: ["Alice", "Bob", "Charlie", "Diana"][i % 4],
  fromDate: `2024-07-${String(10 + (i % 10)).padStart(2, "0")}`,
  toDate: `2024-07-${String(12 + (i % 10)).padStart(2, "0")}`,
  totalPrice: 100 + i * 20,
  status: ["BOOKED", "PENDING", "CANCELLED"][i % 3],
}));

const statusColors = {
  BOOKED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusIcons = {
  BOOKED: <CheckCircle className="h-4 w-4" />,
  PENDING: <Clock className="h-4 w-4" />,
  CANCELLED: <XCircle className="h-4 w-4" />,
};

export default function HotelOwnerBookings() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bookings, setBookings] = useState(dummyBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("_all");
  const [hotelFilter, setHotelFilter] = useState("_all");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Filtering logic (dummy)
  const filteredBookings = bookings.filter(b => {
    const statusMatch = statusFilter === "_all" || b.status === statusFilter;
    const hotelMatch = hotelFilter === "_all" || b.hotelName === hotelFilter;
    const searchMatch =
      !searchTerm ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && hotelMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hotelOptions = Array.from(new Set(dummyBookings.map(b => b.hotelName))).map(hotel => ({
    value: hotel,
    label: hotel,
  }));

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "BOOKED", label: "Booked" },
        { value: "PENDING", label: "Pending" },
        { value: "CANCELLED", label: "Cancelled" },
      ],
      value: statusFilter,
      onValueChange: setStatusFilter,
    },
    {
      key: "hotel",
      label: "Hotel",
      options: hotelOptions,
      value: hotelFilter,
      onValueChange: setHotelFilter,
    },
  ];

  const handleClearFilters = () => {
    setStatusFilter("_all");
    setHotelFilter("_all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        subtitle="View and manage all bookings for your hotels"
      />

      <FilterBar
        searchPlaceholder="Search by customer or hotel..."
        onSearch={setSearchTerm}
        filters={filterOptions}
        onClearFilters={handleClearFilters}
      />

      {filteredBookings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No bookings found"
          description="No bookings match your filters."
        />
      ) : (
        <>
          <div className="space-y-4">
            {paginatedBookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="h-8 w-8 text-blue-500" />
                      <span className="text-xs text-gray-500">{booking.roomType}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{booking.hotelName}</p>
                      <p className="text-sm text-gray-500 truncate">{booking.customerName}</p>
                      <p className="text-xs text-gray-400">
                        {booking.fromDate} - {booking.toDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`text-xs ${statusColors[booking.status as keyof typeof statusColors]}`}>{statusIcons[booking.status as keyof typeof statusIcons]}<span className="ml-1">{booking.status}</span></Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${booking.totalPrice}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/hotel-owner/bookings/${booking.id}`}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredBookings.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}