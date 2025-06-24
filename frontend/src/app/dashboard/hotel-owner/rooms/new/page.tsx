"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, ImageUpload } from "@/components/shared";
import { Bed, ArrowLeft } from "lucide-react";
import { roomService, hotelService } from "@/services/api";
import { CreateRoom, RoomType, TGetAllHotelsByOwner } from "@/types";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const roomSchema = z.object({
  hotelId: z.string().min(1, "Hotel is required"),
  type: z.enum(["SINGLE", "DOUBLE", "SUITE", "DELUXE"] as const),
  price: z.number().min(1, "Price must be greater than 0"),
  beds: z.number().min(1, "Number of beds must be at least 1"),
  photos: z.array(z.string().url("Invalid image URL")).min(1, "At least one photo is required"),
  availableFrom: z.string().min(1, "Available from date is required"),
  availableTo: z.string().min(1, "Available to date is required"),
});

type RoomFormData = z.infer<typeof roomSchema>;

const roomTypeOptions = [
  { value: "SINGLE", label: "Single Room" },
  { value: "DOUBLE", label: "Double Room" },
  { value: "SUITE", label: "Suite" },
  { value: "DELUXE", label: "Deluxe Room" },
];

export default function NewRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<TGetAllHotelsByOwner>([]);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      photos: [],
    },
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelService.getAllHotelsByOwner();
        setHotels(response.data.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        toast.error("Failed to fetch hotels");
      }
    };

    fetchHotels();
  }, []);

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    setValue("photos", newImages);
  };

  const onSubmit = async (data: RoomFormData) => {
    try {
      setLoading(true);
      const roomData: CreateRoom = {
        type: data.type,
        price: data.price,
        beds: data.beds,
        photos: data.photos,
        availableFrom: data.availableFrom,
        availableTo: data.availableTo,
      };

      await roomService.createRoom(data.hotelId, roomData);
      toast.success("Room created successfully!");
      router.push("/dashboard/hotel-owner/rooms");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Room"
        subtitle="Create a new room for your hotel"
        showBackButton
        backHref="/dashboard/hotel-owner/rooms"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                Room Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hotelId">Hotel *</Label>
                <Select onValueChange={(value) => setValue("hotelId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hotel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.hotelId && (
                  <p className="text-sm text-red-500 mt-1">{errors.hotelId.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type">Room Type *</Label>
                <Select onValueChange={(value) => setValue("type", value as RoomType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="price">Price per Night ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Enter price"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="beds">Number of Beds *</Label>
                <Input
                  id="beds"
                  type="number"
                  {...register("beds", { valueAsNumber: true })}
                  placeholder="Enter number of beds"
                  className={errors.beds ? "border-red-500" : ""}
                />
                {errors.beds && (
                  <p className="text-sm text-red-500 mt-1">{errors.beds.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images and Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Room Images & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="availableFrom">Available From *</Label>
                <Input
                  id="availableFrom"
                  type="date"
                  {...register("availableFrom")}
                  className={errors.availableFrom ? "border-red-500" : ""}
                />
                {errors.availableFrom && (
                  <p className="text-sm text-red-500 mt-1">{errors.availableFrom.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="availableTo">Available To *</Label>
                <Input
                  id="availableTo"
                  type="date"
                  {...register("availableTo")}
                  className={errors.availableTo ? "border-red-500" : ""}
                />
                {errors.availableTo && (
                  <p className="text-sm text-red-500 mt-1">{errors.availableTo.message}</p>
                )}
              </div>

              <div>
                <Label>Room Images *</Label>
                <ImageUpload
                  images={images}
                  onImagesChange={handleImagesChange}
                  maxImages={5}
                  placeholder="Enter image URL..."
                />
                {errors.photos && (
                  <p className="text-sm text-red-500 mt-2">{errors.photos.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/hotel-owner/rooms">
            <Button type="button" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Room"}
          </Button>
        </div>
      </form>
    </div>
  );
} 