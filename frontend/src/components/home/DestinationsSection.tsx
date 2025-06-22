import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Destination {
  name: string;
  image: string;
  hotels: number;
  price: string;
}

interface DestinationsSectionProps {
  destinations?: Destination[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  description?: string;
}

const defaultDestinations: Destination[] = [
  {
    name: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    hotels: 250,
    price: "From $150"
  },
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898534-47d22c27d1f2?w=400&h=300&fit=crop",
    hotels: 180,
    price: "From $120"
  },
  {
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    hotels: 320,
    price: "From $100"
  },
  {
    name: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    hotels: 200,
    price: "From $140"
  }
];

export function DestinationsSection({
  destinations = defaultDestinations,
  title = "Explore Amazing",
  subtitle = "Cities Worldwide",
  badgeText = "Popular Destinations",
  description = "Discover the most popular destinations and find your next adventure"
}: DestinationsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.name} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.hotels} hotels</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Starting from</span>
                  <span className="font-bold text-blue-600">{destination.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 