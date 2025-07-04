"use client";

import { useState } from "react";
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
import { CreateHotel } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export default function NewHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      amenities: [],
      photos: [],
    },
  });

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
      const hotelData: CreateHotel = {
        name: data.name,
        description: data.description,
        location: data.location,
        amenities: data.amenities,
        photos: data.photos,
      };

      await hotelService.createHotel(hotelData);
      toast.success("Hotel created successfully!");
      router.push("/dashboard/hotel-owner/hotels");
    } catch (error) {
      console.error("Error creating hotel:", error);
      toast.error("Failed to create hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Hotel"
        subtitle="Create a new hotel property"
        showBackButton
        backHref="/dashboard/hotel-owner/hotels"
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
          <Link href="/dashboard/hotel-owner/hotels">
            <Button type="button" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </div>
  );
}