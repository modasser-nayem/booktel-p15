import { Search, Shield, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface FeaturesSectionProps {
  features?: Feature[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "AI-powered search to find your perfect hotel match",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Bank-level security for all your transactions",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "Authentic reviews from real guests only",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description: "Get instant booking confirmations",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export function FeaturesSection({ 
  features = defaultFeatures,
  title = "Everything You Need for",
  subtitle = "Perfect Travel",
  badgeText = "Why Choose Us"
}: FeaturesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
            {badgeText}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
            <span className="block text-blue-600">{subtitle}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;ve built the most comprehensive hotel booking platform with features that make your travel planning effortless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 