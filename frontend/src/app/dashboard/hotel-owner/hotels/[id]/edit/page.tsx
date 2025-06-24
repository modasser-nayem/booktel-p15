"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader, ImageUpload } from "@/components/shared";
import { Building, ArrowLeft } from "lucide-react";
import { hotelService } from "@/services/api";
import { CreateHotel, TGetHotelDetails } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

const hotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  photos: z.array(z.string().url("Invalid image URL")).min(1, "At least one photo is required"),
});

type HotelFormData = z.infer<typeof hotelSchema>;

const amenityOptions = [
  "WiFi",
  "Parking",
  "Swimming Pool",
  "Gym",
  "Restaurant",
  "Bar",
  "Spa",
  "Conference Room",
  "Room Service",
  "Laundry",
  "Air Conditioning",
  "Heating",
  "TV",
  "Mini Bar",
  "Safe",
  "Balcony",
  "Ocean View",
  "Mountain View",
  "City View",
  "Pet Friendly",
];

export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [hotel, setHotel] = useState<TGetHotelDetails | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      amenities: [],
      photos: [],
    },
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setFetching(true);
        const response = await hotelService.getHotelDetails(hotelId);
        const hotelData = response.data.data;
        setHotel(hotelData);
        
        // Pre-fill the form
        reset({
          name: hotelData.name,
          description: hotelData.description,
          location: hotelData.location,
          amenities: hotelData.amenities,
          photos: hotelData.photos,
        });
        
        setSelectedAmenities(hotelData.amenities);
        setImages(hotelData.photos);
      } catch (error) {
        console.error("Error fetching hotel:", error);
        toast.error("Failed to fetch hotel details");
        router.push("/dashboard/hotel-owner/hotels");
      } finally {
        setFetching(false);
      }
    };

    if (hotelId) {
      fetchHotel();
    }
  }, [hotelId, router, reset]);

  const handleAmenityToggle = (amenity: string) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    
    setSelectedAmenities(updated);
    setValue("amenities", updated);
  };

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    setValue("photos", newImages);
  };

  const onSubmit = async (data: HotelFormData) => {
    try {
      setLoading(true);
      const hotelData: Partial<CreateHotel> = {
        name: data.name,
        description: data.description,
        location: data.location,
        amenities: data.amenities,
        photos: data.photos,
      };

      await hotelService.updateHotel(hotelId, hotelData);
      toast.success("Hotel updated successfully!");
      router.push(`/dashboard/hotel-owner/hotels/${hotelId}`);
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
        <p className="text-gray-600 mb-4">The hotel you&apos;re trying to edit doesn&apos;t exist.</p>
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
        title="Edit Hotel"
        subtitle={`Editing ${hotel.name}`}
        showBackButton
        backHref={`/dashboard/hotel-owner/hotels/${hotelId}`}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Hotel Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter hotel name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Enter hotel location"
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter hotel description"
                  rows={4}
                  className={`w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Hotel Images *</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={images}
                onImagesChange={handleImagesChange}
                maxImages={5}
                placeholder="Enter image URL..."
              />
              {errors.photos && (
                <p className="text-sm text-red-500 mt-2">{errors.photos.message}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Amenities *</CardTitle>
            <p className="text-sm text-gray-600">
              Select the amenities available at your hotel
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
            {errors.amenities && (
              <p className="text-sm text-red-500 mt-2">{errors.amenities.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link href={`/dashboard/hotel-owner/hotels/${hotelId}`}>
            <Button type="button" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Hotel"}
          </Button>
        </div>
      </form>
    </div>
  );
} 