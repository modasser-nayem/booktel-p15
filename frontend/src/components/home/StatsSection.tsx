import { Building, Users, Globe, Calendar } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { label: "Hotels Worldwide", value: "10,000+", icon: Building, change: "+15%" },
  { label: "Happy Guests", value: "2M+", icon: Users, change: "+25%" },
  { label: "Countries", value: "150+", icon: Globe, change: "+8%" },
  { label: "Bookings", value: "500K+", icon: Calendar, change: "+30%" }
];

export function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 mb-1">{stat.label}</div>
              <div className="text-sm text-green-600 font-medium">{stat.change} this year</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 