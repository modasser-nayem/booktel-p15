import { Wifi, Car, UtensilsCrossed, Bed, Hotel, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Amenity {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

interface AmenitiesSectionProps {
  amenities?: Amenity[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  description?: string;
}

const defaultAmenities: Amenity[] = [
  { icon: Wifi, name: "Free WiFi" },
  { icon: Car, name: "Free Parking" },
  { icon: UtensilsCrossed, name: "Restaurant" },
  { icon: Bed, name: "Room Service" },
  { icon: Hotel, name: "Spa & Gym" },
  { icon: Shield, name: "24/7 Security" }
];

export function AmenitiesSection({
  amenities = defaultAmenities,
  title = "Premium Amenities",
  subtitle = "You Deserve",
  badgeText = "Hotel Amenities",
  description = "Every hotel on our platform offers premium amenities for your comfort"
}: AmenitiesSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            {badgeText}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
            <span className="block text-blue-600">{subtitle}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((amenity) => (
            <div key={amenity.name} className="text-center group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <amenity.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 