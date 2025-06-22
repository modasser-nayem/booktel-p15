"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  MapPin, 
  Filter,
  Grid,
  List,
  Heart,
  Eye
} from "lucide-react";
import { hotelService } from "@/services/api";
import { TGetAllHotels, HotelFilters } from "@/types/hotel";
import Link from "next/link";
import { useDebounce } from "@/hooks";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<TGetAllHotels>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<HotelFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const debouncedFilters = useDebounce(filters, 300);

  const fetchHotels = async (currentFilters: HotelFilters) => {
    try {
      setLoading(true);
      const response = await hotelService.getAllHotels(currentFilters);
      // If paginated, use response.data.data; if not, use response.data
      const data = response.data.data.data;
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(debouncedFilters);
  }, [debouncedFilters]);

  const handleFilterChange = (key: keyof HotelFilters, value: string | number | string[]) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Stay</h1>
        <p className="text-gray-600">Discover amazing hotels and book your next adventure</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search hotels, locations, or amenities..."
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="h-12"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="h-12 px-4"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    placeholder="City, country..."
                    value={filters.location || ""}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Min Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.priceMin || ""}
                    onChange={(e) => handleFilterChange("priceMin", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Max Price</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={filters.priceMax || ""}
                    onChange={(e) => handleFilterChange("priceMax", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Sort By</Label>
                  <Select
                    value={filters.sortBy || ""}
                    onValueChange={(value) => handleFilterChange("sortBy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {hotels.length} hotel{hotels.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Hotels Grid/List */}
      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Hotel Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-t-lg">
                  <div className="absolute inset-0 bg-black bg-opacity-20" />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Hotel Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {hotel.name}
                    </h3>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{hotel._count.rooms || 0} rooms</span>
                      </div>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 