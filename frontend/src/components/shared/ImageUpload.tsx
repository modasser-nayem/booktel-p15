import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  placeholder?: string;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  placeholder = "Enter image URL...",
}: ImageUploadProps) {
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAddImage = () => {
    if (newImageUrl.trim() && images.length < maxImages) {
      onImagesChange([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddImage();
    }
  };

  return (
    <div className="space-y-4">
      {/* Image URL Input */}
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={images.length >= maxImages}
        />
        <Button
          type="button"
          onClick={handleAddImage}
          disabled={!newImageUrl.trim() || images.length >= maxImages}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((url, idx) => (
            <Card key={idx} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23f3f4f6'/%3E%3Ctext x='48' y='48' font-family='Arial' font-size='10' fill='%236b7280' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveImage(idx)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate" title={url}>
                  Image {idx + 1}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No images added yet</p>
          <p className="text-sm text-gray-400">Add image URLs to display previews</p>
        </div>
      )}

      {/* Max Images Warning */}
      {images.length >= maxImages && (
        <p className="text-sm text-amber-600">
          Maximum {maxImages} images allowed
        </p>
      )}
    </div>
  );
} 