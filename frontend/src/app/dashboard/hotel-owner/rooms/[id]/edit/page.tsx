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
import { useRouter, useParams } from "next/navigation";

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

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [hotels, setHotels] = useState<TGetAllHotelsByOwner>([]);
  const [images, setImages] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [room, setRoom] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      photos: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const [roomResponse, hotelsResponse] = await Promise.all([
          roomService.getRoomDetails(roomId),
          hotelService.getAllHotelsByOwner(),
        ]);

        const roomData = roomResponse.data.data;
        setRoom(roomData);
        setHotels(hotelsResponse.data.data.data);
        
        // Pre-fill the form
        reset({
          hotelId: roomData.hotelId,
          type: roomData.type,
          price: roomData.price,
          beds: roomData.beds,
          photos: roomData.photos,
          availableFrom: roomData.availableFrom.split('T')[0], // Convert to date format
          availableTo: roomData.availableTo.split('T')[0], // Convert to date format
        });
        
        setImages(roomData.photos);
      } catch (error) {
        console.error("Error fetching room:", error);
        toast.error("Failed to fetch room details");
        router.push("/dashboard/hotel-owner/rooms");
      } finally {
        setFetching(false);
      }
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId, router, reset]);

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    setValue("photos", newImages);
  };

  const onSubmit = async (data: RoomFormData) => {
    try {
      setLoading(true);
      const roomData: Partial<CreateRoom> = {
        type: data.type,
        price: data.price,
        beds: data.beds,
        photos: data.photos,
        availableFrom: data.availableFrom,
        availableTo: data.availableTo,
      };

      await roomService.updateRoom(roomId, roomData);
      toast.success("Room updated successfully!");
      router.push(`/dashboard/hotel-owner/rooms/${roomId}`);
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room");
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

  if (!room) {
    return (
      <div className="text-center py-12">
        <Bed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Room not found</h2>
        <p className="text-gray-600 mb-4">The room you&apos;re trying to edit doesn&apos;t exist.</p>
        <Link href="/dashboard/hotel-owner/rooms">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rooms
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Room"
        subtitle={`Editing ${room.type} Room`}
        showBackButton
        backHref={`/dashboard/hotel-owner/rooms/${roomId}`}
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
                <Select 
                  value={room.hotelId} 
                  onValueChange={(value) => setValue("hotelId", value)}
                  disabled
                >
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
                <Select 
                  value={room.type} 
                  onValueChange={(value) => setValue("type", value as RoomType)}
                >
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
          <Link href={`/dashboard/hotel-owner/rooms/${roomId}`}>
            <Button type="button" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Room"}
          </Button>
        </div>
      </form>
    </div>
  );
} 